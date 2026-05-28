# RF04 — Raio de Atuação do Profissional (Frontend)

> **Requisito:** Permitir que o profissional defina um raio de atendimento em km. Clientes fora desse raio não visualizam o profissional nos resultados de busca e não conseguem concluir o agendamento.

---

## 1. Visão Geral do Fluxo

```
[Portal do Parceiro — Dashboard]
        │
        ▼
[QuickAction "Área de Atendimento"]
        │
        ▼
[ProfessionalRadiusScreen]
  Exibe raio atual → edita → PUT /api/professionals/:id/radius
        │
        ▼
[Store Professional — updateRadius]
  Atualiza selectedProfessional.service_radius_km localmente


[Cliente — Busca de Serviços]
        │
        ▼
[SearchResultScreen]
  Passa lat/lng do cliente → GET /api/professionals/search-availability
  Backend filtra: distância > service_radius_km → profissional não retornado
        │
        ▼
[CheckoutScreen]
  Valida (Haversine) endereço selecionado vs raio do profissional
  ├─ Dentro do raio → exibe PaymentSheet
  └─ Fora do raio → bloqueia pagamento + exibe aviso inline


[Perfil Público do Parceiro — PartnerProfile]
  Exibe "Atende até X km" publicamente
```

---

## 2. Arquivos Criados / Alterados

### 2.1 Tela de Configuração (Portal do Parceiro)

#### `src/screens/private/professional/RadiusScreen/ProfessionalRadiusScreen.tsx`

**Status: CRIADO**

Tela exclusiva do profissional para visualizar e editar o raio de atendimento.

- **Carregamento:** ao montar, busca o profissional via `fetchProfessionalById(professionalId)` e pré-preenche o campo com `service_radius_km` atual.
- **Campo de entrada:** `CustomTextInput` numérico (apenas dígitos, máx. 4 caracteres), label "Raio de atendimento (km)".
- **Preview em tempo real:** texto dinâmico abaixo do input: _"Você atenderá até X km do seu endereço."_
- **Validação local:** km deve ser inteiro ≥ 0; exibe `Alert` se inválido.
- **Salvar:** chama `updateRadius(professionalId, km)` → `PUT /api/professionals/:id/radius` → exibe `Alert` de sucesso → `navigation.goBack()`.
- **Estados de UI:** `loading` (ActivityIndicator ao buscar), `saving` (ActivityIndicator no botão), card informativo com ícone de localização.
- **Guard:** se `professional_id` não existe no usuário, exibe mensagem de erro e não renderiza formulário.

---

### 2.2 Store e Tipos

#### `src/stores/Professional/types.ts`

**Status: Alterado**

- Adicionado campo `service_radius_km?: number` na interface `Professional`.
- Adicionado campo `lat?` e `lng?` na interface `Address`.
- Adicionada assinatura do método `updateRadius(professionalId: number, radiusKm: number): Promise<void>` em `ProfessionalStore`.

---

#### `src/stores/Professional/Professional.ts`

**Status: Alterado**

- **`fetchProfessionalsByAvailability(subCategoryId, date, lat?, lng?)`:** parâmetros `lat` e `lng` adicionados; enviados como query params para `GET /api/professionals/search-availability`. Backend usa as coordenadas para filtrar por raio.
- **`fetchProfessionals(filter, page, limit, lat?, lng?)`:** `lat` e `lng` adicionados para `GET /api/professionals`.
- **`updateRadius(professionalId, radiusKm)`** — **NOVO:**
  - `PUT /api/professionals/:id/radius` com body `{ service_radius_km: Math.floor(radiusKm) }`.
  - Após sucesso, atualiza `selectedProfessional.service_radius_km` localmente no store (sem precisar refetch).

---

### 2.3 Telas de Busca e Agendamento

#### `src/screens/public/SearchResultScreen/SearchResultScreen.tsx`

**Status: Alterado**

- Importa `useLocation` do `LocationContext` para obter o endereço/coordenadas do cliente.
- Extrai `lat` e `lng` do objeto `address` retornado pelo contexto de localização.
- Passa `lat` e `lng` como argumentos para `fetchProfessionalsByAvailability(subCategoryId, date, lat, lng)`.
- O backend recebe as coordenadas e **exclui da resposta** qualquer profissional cujo `service_radius_km` seja menor que a distância calculada até o cliente.
- Resultado: clientes fora do raio simplesmente não enxergam o profissional.

---

#### `src/screens/public/CheckoutScreen/CheckoutScreen/CheckoutScreen.tsx`

**Status: Alterado**

Segunda camada de verificação de raio, aplicada no momento do agendamento.

**Função utilitária adicionada:**

```ts
function haversineKm(lat1, lng1, lat2, lng2): number;
```

Calcula distância em km entre dois pares de coordenadas usando a fórmula de Haversine (raio da Terra = 6371 km).

**Estado adicionado:**

```ts
const [radiusWarning, setRadiusWarning] = useState<string | null>(null);
```

**Lógica de verificação (`useEffect` de inicialização de pagamento):**

1. Ao selecionar endereço, verifica se `selectedAddress.lat` e `selectedAddress.lng` existem (geocodificados). Se não existirem, exibe aviso: _"Endereço sem coordenadas. Adicione um endereço geocodificado para continuar."_
2. Se o profissional tiver `service_radius_km > 0` e `MainAddress` com coordenadas:
   - Calcula `distKm = haversineKm(profLat, profLng, clientLat, clientLng)`.
   - Se `distKm > radius`: define `radiusWarning` com mensagem exibindo a distância e o limite, **cancela** a inicialização do `PaymentSheet` (`setClientSecret(null)`).
   - Se dentro do raio: limpa `radiusWarning` e prossegue normalmente.

**UX de bloqueio:**

- Aviso inline em caixa amarela/laranja exibido abaixo do seletor de endereço com o texto da `radiusWarning`.
- O botão de pagamento (`PaymentSheet`) só é exibido quando `clientSecret && selectedAddress && !radiusWarning`.

**Tratamento de erro do backend (fallback):**

- Se o servidor retornar HTTP 400 com mensagem contendo "fora do raio", exibe `Alert.alert` com duas opções:
  - "Escolher Endereço" → abre modal de seleção de endereço.
  - "Procurar Outro" → `navigation.goBack()`.

---

### 2.4 Perfil Público do Parceiro

#### `src/screens/public/PartnerProfile/PartnerProfile.tsx`

**Status: Alterado**

- Na seção de localização do perfil, exibe badge condicional: _"• Atende até X km"_ quando `parceiro.service_radius_km != null`.
- Permite ao cliente saber antes de agendar qual é o alcance do profissional.

---

### 2.5 Cadastro como Parceiro (TornarParceiroForm)

#### `src/screens/private/client/Profile/Tabs/TornarParceiroForm/TornarParceiroForm.tsx`

**Status: Alterado**

- Campo `service_radius_km` adicionado ao formulário de cadastro como parceiro.
- Permite que o profissional defina seu raio já no momento do cadastro inicial.
- Valor enviado no payload para `POST /api/professionals`.

---

### 2.6 Navegação

#### `src/screens/NavigationStack.tsx`

**Status: Alterado**

- Import de `ProfessionalRadiusScreen` adicionado.
- Rota `ProfessionalArea` registrada no `RootStack`:
  ```ts
  ProfessionalArea: {
    screen: ProfessionalRadiusScreen,
    options: { title: 'Área de Atendimento' }
  }
  ```

---

#### `src/screens/private/ProfessionalDashboard.tsx`

**Status: Alterado**

- `QuickAction` "Área de Atendimento" adicionado ao scroll horizontal de ações rápidas.
- `onPress` navega para `ProfessionalArea`.

---

## 3. Endpoints de Backend Consumidos

| Método | Rota                                     | Descrição                                              | Arquivo                            |
| ------ | ---------------------------------------- | ------------------------------------------------------ | ---------------------------------- |
| `PUT`  | `/api/professionals/:id/radius`          | Atualiza raio de atendimento                           | `Professional.ts` (store)          |
| `GET`  | `/api/professionals/:id`                 | Carrega raio atual do profissional                     | `Professional.ts` (store)          |
| `GET`  | `/api/professionals/search-availability` | Busca profissionais com filtro por raio (lat/lng)      | `Professional.ts` (store)          |
| `POST` | `/api/appointments`                      | Criação do agendamento — backend valida raio novamente | `CheckoutScreen.tsx` (via confirm) |

---

## 4. Camadas de Validação de Raio

| Camada                    | Onde                                         | Quando                       | Efeito                                             |
| ------------------------- | -------------------------------------------- | ---------------------------- | -------------------------------------------------- |
| **Busca (backend)**       | `GET /api/professionals/search-availability` | Ao buscar profissionais      | Profissional fora do raio **não retorna** na lista |
| **Checkout (frontend)**   | `CheckoutScreen` — `useEffect` de pagamento  | Ao selecionar/mudar endereço | Aviso inline + bloqueio do botão de pagamento      |
| **Agendamento (backend)** | `POST /api/appointments`                     | Ao confirmar pagamento       | Retorna `HTTP 400` se endereço fora do raio        |

---

## 5. Diagrama de Dependências

```
ProfessionalDashboard
  └─► [navega] ProfessionalArea
                └─► ProfessionalRadiusScreen (tela)
                      ├─► useUserStore (professional_id)
                      └─► useProfessionalStore
                            ├─► fetchProfessionalById ──► GET /api/professionals/:id
                            └─► updateRadius ──────────► PUT /api/professionals/:id/radius

SearchResultScreen
  ├─► useLocation (lat/lng do cliente)
  └─► useProfessionalStore.fetchProfessionalsByAvailability(lat, lng)
        └─► GET /api/professionals/search-availability?lat=&lng=
              └─► Backend filtra: distância > service_radius_km → exclui profissional

CheckoutScreen
  ├─► useProfessionalStore.selectedProfessional.service_radius_km
  ├─► selectedAddress.lat / selectedAddress.lng
  ├─► haversineKm() [função local]
  ├─► setRadiusWarning() → aviso inline
  └─► condicional: !radiusWarning → exibe PaymentSheet

PartnerProfile
  └─► parceiro.service_radius_km → badge "Atende até X km"

TornarParceiroForm
  └─► campo service_radius_km → POST /api/professionals
```

---

## 6. Resumo de Arquivos por Categoria

| Categoria                | Arquivo                                                                             | Status     |
| ------------------------ | ----------------------------------------------------------------------------------- | ---------- |
| Tela (parceiro)          | `src/screens/private/professional/RadiusScreen/ProfessionalRadiusScreen.tsx`        | **CRIADO** |
| Store — tipos            | `src/stores/Professional/types.ts`                                                  | Alterado   |
| Store — lógica           | `src/stores/Professional/Professional.ts`                                           | Alterado   |
| Tela (busca)             | `src/screens/public/SearchResultScreen/SearchResultScreen.tsx`                      | Alterado   |
| Tela (agendamento)       | `src/screens/public/CheckoutScreen/CheckoutScreen/CheckoutScreen.tsx`               | Alterado   |
| Tela (perfil público)    | `src/screens/public/PartnerProfile/PartnerProfile.tsx`                              | Alterado   |
| Tela (cadastro parceiro) | `src/screens/private/client/Profile/Tabs/TornarParceiroForm/TornarParceiroForm.tsx` | Alterado   |
| Navegação                | `src/screens/NavigationStack.tsx`                                                   | Alterado   |
| Dashboard                | `src/screens/private/ProfessionalDashboard.tsx`                                     | Alterado   |
