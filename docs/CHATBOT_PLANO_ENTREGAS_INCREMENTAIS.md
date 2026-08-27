# Chatbot DelBicos — plano operacional de entregas incrementais

## 1. Objetivo

Este documento define como decompor as branches grandes `feature/chatbot` dos
repositórios frontend e backend em PRs menores, seguras e fáceis de revisar.

Para cada entrega são informados:

- requisitos atendidos;
- ordem e dependências;
- branch sugerida;
- arquivos exclusivos que podem ser trazidos integralmente;
- arquivos compartilhados que devem ser selecionados por trechos;
- ordem entre backend e frontend;
- critérios mínimos para aceitar a PR.

Escopo auditado em 27 de agosto de 2026:

- frontend: PR #156, com 54 arquivos alterados;
- backend: PR #123, com 77 arquivos alterados;
- origem das alterações: `feature/chatbot`;
- destino final: `stag`;
- fora do escopo: `feature/comando-voz`.

## 2. Regra principal para criação das branches

A `feature/chatbot` deve ser usada como **fonte e referência**, mas não como
branch-base das novas PRs destinadas à `stag`.

Fluxo recomendado:

```text
origin/stag atualizada
        |
        +-- nova branch pequena
                |
                +-- copiar somente arquivos/trechos da feature/chatbot
                +-- testar
                +-- abrir PR para stag
                +-- mesclar
        |
origin/stag atualizada novamente
        |
        +-- próxima branch pequena
```

Se uma branch for criada diretamente a partir da `feature/chatbot` e a PR for
aberta contra `stag`, ela continuará contendo quase todo o diff de 54/77
arquivos. Isso não reduz o esforço de revisão.

Comandos-base em cada repositório:

```bash
git fetch origin
git switch stag
git pull --ff-only origin stag
git switch -c <nome-da-nova-branch>
```

Para arquivo exclusivo da entrega:

```bash
git restore --source feature/chatbot -- <arquivo-ou-pasta>
```

Para arquivo utilizado por várias entregas:

```bash
git restore -p --source feature/chatbot -- <arquivo>
```

O modo interativo por trechos é obrigatório para controllers, services, hooks
e componentes que contêm requisitos de mais de uma etapa.

## 3. Visão geral e ordem das entregas

| Ordem | Entrega | Backend primeiro? | Frontend necessário? | Requisitos principais |
| --- | --- | --- | --- | --- |
| D00 | Requisitos, contratos e documentação-base | Não se aplica | Documento no frontend | RNF-CHAT-15, RNF-CHAT-17 |
| D01 | Serviço de PLN TF-IDF + SVM | Sim; somente backend | Não | RF-CHAT-03, RF-CHAT-04, RNF-CHAT-01, RNF-CHAT-10, RNF-CHAT-11 |
| D02 | Núcleo conversacional, autenticação e sessão | Sim | Sim, após backend | RF-CHAT-01, RF-CHAT-02, RF-CHAT-04, RF-CHAT-11, RF-CHAT-12 |
| D03A | Correção isolada de serviços e navegação profissional | Não | Sim; PR independente | RF-CHAT-17 e parte do RF-CHAT-18 |
| D03 | Busca e seleção de serviço/profissional | Sim | Sim, após backend | RF-CHAT-05 |
| D04A | Regra global de antecedência | Sim; PR independente | Apenas tratamento de erro já existente | RF-CHAT-19, RN-CHAT-11 |
| D04 | Datas, horários, disponibilidade e criação `pending` | Sim | Sim, após backend | RF-CHAT-06, RF-CHAT-07, RF-CHAT-16 |
| D05 | Consulta, cancelamento e reagendamento | Sim | Sim, após backend | RF-CHAT-08, RF-CHAT-09, RF-CHAT-10 |
| D06 | Aceite, recusa, expiração e atualização em tempo real | Sim | Sim, após backend | RF-CHAT-13, RF-CHAT-15, RF-CHAT-20 |
| D07 | Pagamento do agendamento aceito | Sim | Sim, após backend | RF-CHAT-14, RF-CHAT-15 e parte do RF-CHAT-18 |
| D08 | Seeders, homologação, testes e limpeza | Sim | Sim | RNF-CHAT-03, RNF-CHAT-10, RNF-CHAT-14, RNF-CHAT-15, RNF-CHAT-18, RNF-CHAT-19 |
| D09 | Tooling `.codex` | Independente | Independente | RNF-CHAT-16 |

Ordem de dependência do núcleo:

```text
D00 -> D01 -> D02 -> D03 -> D04 -> D05 -> D06 -> D07 -> D08
                    ^       ^
                   D03A    D04A

D09 é independente e não deve bloquear o produto.
```

## 4. D00 — requisitos, contratos e documentação-base

### Branches sugeridas

- frontend: `docs/chatbot-plano-entregas`;
- backend: `docs/chatbot-contratos`.

### Requisitos

- RNF-CHAT-15 — documentação técnica completa e rastreável;
- RNF-CHAT-17 — contratos tipados e validação consistente.

### Frontend

Arquivos:

- `docs/CHATBOT_INVENTARIO_FRONTEND.md`;
- `docs/CHATBOT_PLANO_ENTREGAS_INCREMENTAIS.md`.

### Backend

Arquivos:

- `docs/CHATBOT_FLUXO_COMPLETO.md`;
- `docs/CHATBOT_INVENTARIO_BACKEND.md`;
- `docs/CHATBOT_PLN.md`;
- `docs/DOCUMENTACAO_TECNICA_PLN_CHATBOT.md`.

### Critério de aceite

- RFs, RNFs e regras de negócio aprovados;
- campos de sessão, mensagem, contexto, serviço, slot e status documentados;
- contrato do evento `appointment:status` definido;
- comando de voz explicitamente fora do escopo;
- decisões sobre migrations, antecedência e pagamento registradas.

## 5. D01 — serviço de PLN TF-IDF + SVM

### Branch backend

`feature/chatbot-d01-pln-svm`

Não existe PR frontend nesta entrega.

### Requisitos

- RF-CHAT-03 — classificar intenção;
- RF-CHAT-04 — responder por regras;
- RNF-CHAT-01 — TF-IDF + SVM, sem IA generativa;
- RNF-CHAT-10 — testes e métricas;
- RNF-CHAT-11 — implantação reproduzível;
- RNF-CHAT-18 — controle dos artefatos treinados.

### Arquivos backend que entram integralmente

- `nlp-service/Dockerfile`;
- `nlp-service/requirements.txt`;
- `nlp-service/app/__init__.py`;
- `nlp-service/app/main.py`;
- `nlp-service/app/model.py`;
- `nlp-service/app/preprocess.py`;
- `nlp-service/app/train.py`;
- `nlp-service/data/intents.json`;
- `nlp-service/tests/test_model.py`;
- `nlp-service/tests/test_preprocess.py`;
- `nlp-service/artifacts/.gitkeep`.

### Arquivos backend que entram somente por trechos

- `.env.example`: variáveis do serviço de PLN;
- `.gitignore`: artefatos e caches Python;
- `docker-compose.yml`: container, healthcheck e dependências do `nlp-service`.

### Não incluir

- migrations do chatbot;
- controllers e rotas Node;
- seeders;
- arquivos `.codex`;
- artefatos binários do modelo treinado.

### Critério de aceite

- treinamento reproduzível a partir do corpus versionado;
- pré-processamento testado;
- vetorização realizada com TF-IDF;
- classificação realizada com SVM/`LinearSVC`;
- métricas de acurácia e F1 macro geradas;
- `/health` saudável;
- `/classify` retorna intenção, confiança e versão;
- nenhuma chamada a modelo generativo;
- `pytest` aprovado.

## 6. D02 — núcleo conversacional, autenticação e sessão

### Branches sugeridas

- backend: `feature/chatbot-d02-core-sessao`;
- frontend: `feature/chatbot-d02-interface-sessao`.

### Ordem

1. Entregar e integrar o backend.
2. Validar os endpoints em `stag`.
3. Criar a branch frontend a partir da `stag` atualizada.
4. Entregar a interface consumindo o backend real.

### Requisitos

- RF-CHAT-01, RF-CHAT-02, RF-CHAT-04, RF-CHAT-11 e RF-CHAT-12;
- RNF-CHAT-02, RNF-CHAT-04, RNF-CHAT-06 e RNF-CHAT-08;
- RNF-CHAT-13, RNF-CHAT-17 e RNF-CHAT-19.

### Backend — arquivos que entram integralmente

Persistência:

- `migrations/20260702100000-create-bot-chat-session.js`;
- `migrations/20260702100001-create-bot-chat-message.js`;
- `migrations/20260716103000-add-auth-session-to-bot-chat-session.js`;
- `migrations/20260717120000-scope-bot-chat-session-by-user.js`;
- `migrations/20260723100000-enforce-auth-session-not-null.js`;
- `src/models/BotChatSession.ts`;
- `src/models/BotChatMessage.ts`.

API e motor básico:

- `src/constants/botStates.ts`;
- `src/controllers/botChat.controller.ts`;
- `src/services/bot/BotStateNode.ts`;
- `src/services/bot/BotMessageRouter.ts`;
- `src/services/nlu.service.ts`;
- `src/services/__tests__/nlu.service.test.ts`;
- `src/services/bot/states/__tests__/InicioState.test.ts`.

### Backend — arquivos compartilhados que entram por trechos

- `src/models/associations.ts`: somente associações de sessão e mensagem;
- `src/interfaces/authentication.interface.ts`: `jti` e `authSessionId`;
- `src/middlewares/auth.middleware.ts`: propagação do `jti` sem log sensível;
- `src/utils/authUtils.ts`: geração de `jwtid`;
- `src/routes/chat.routes.ts`: somente rotas `/bot/message` e sessão;
- `src/services/bot/BotSessionManager.ts`: criação, restauração e reinício;
- `src/services/bot/states/InicioState.ts`: saudação, menu e fallback inicial;
- `src/services/botConversation.service.ts`: orquestração mínima do núcleo.

### Frontend — arquivos que entram integralmente

Estado e aplicação:

- `src/stores/ChatBot/ChatBot.ts`;
- `src/stores/ChatBot/index.ts`;
- `src/stores/ChatBot/types.ts`, somente tipos disponíveis nesta etapa;
- `src/hooks/useChatSession.ts`, em versão mínima desta etapa.

Interface básica:

- `src/components/features/ChatBot/ChatWidget/*`;
- `src/components/features/ChatBot/ChatWindow/ChatErrorBanner/*`;
- `src/components/features/ChatBot/ChatWindow/ChatHeader/*`;
- `src/components/features/ChatBot/ChatWindow/ChatInputBar/*`;
- `src/components/features/ChatBot/ChatWindow/MessageBubble/*`, sem opções futuras;
- `src/components/features/ChatBot/ChatWindow/hooks/useRateLimitCountdown.ts`;
- `src/components/features/ChatBot/ChatWindow/ChatWindow.tsx`, composição mínima;
- `src/components/features/ChatBot/ChatWindow/index.ts`;
- `src/components/features/ChatBot/ChatWindow/styles.ts`;
- `src/components/features/ChatBot/TypingIndicator/*`;
- `src/screens/private/chatbot/ChatBotScreen.tsx`.

### Frontend — arquivos compartilhados que entram por trechos

- `src/App.tsx`: montagem do widget somente para autenticados;
- `src/screens/NavigationStack.tsx`: rota do chatbot;
- `src/screens/navigationRef.ts`: base necessária de navegação;
- `src/screens/types.ts`: somente tipos da rota do bot;
- `src/stores/User/User.ts`: limpeza do estado do bot no logout;
- `src/utils/validators.ts`: validação das mensagens do bot.

### Tratamento do timeout

Não copiar a alteração global de `src/lib/helpers/httpClient.ts` de 10 para 30
segundos. Se o bot precisar de 30 segundos, aplicar timeout apenas na requisição
do chatbot. Assim login, GPS, agenda e demais chamadas mantêm o comportamento
anterior.

### Critério de aceite

- apenas usuário autenticado acessa o chatbot;
- mensagem recebe resposta determinística;
- saudação, menu e fallback funcionam;
- sessão é restaurada somente para o mesmo usuário/autenticação;
- reiniciar encerra a sessão anterior e limpa a interface;
- logout remove o estado local;
- histórico de outro usuário retorna acesso negado;
- rate limit e indisponibilidade do Python geram erro conhecido;
- migrations funcionam em banco limpo e possuem rollback revisado;
- testes Node, lint frontend e validação manual web/mobile aprovados.

## 7. D03A — serviços e navegação profissional

### Branch frontend

`fix/professional-services-navigation`

Esta PR pode entrar depois da D02 e antes da D03. Não existe backend novo.

### Requisitos

- RF-CHAT-17 — separar serviços públicos e serviços do profissional;
- parte do RF-CHAT-18 — continuidade de navegação profissional;
- RNF-CHAT-12 — baixo impacto nas funcionalidades existentes;
- RNF-CHAT-17 — contrato tipado do serviço.

### Arquivos frontend

- `src/stores/Services/Services.ts`;
- `src/screens/private/professional/Services/ServicesList.tsx`;
- hunk do botão de retorno em `src/screens/private/ProfessionalDashboard.tsx`.

### Critério de aceite

- `fetchMyServices` preenche somente `myServices`;
- carregar “Meus Serviços” não substitui a busca pública;
- criar, editar e excluir atualiza `myServices`;
- preço funciona com `price_cents` e fallback `price`;
- modal automático abre somente quando aplicável;
- botões de retorno funcionam em web, Android e iOS.

## 8. D03 — busca e seleção de serviço/profissional

### Branches sugeridas

- backend: `feature/chatbot-d03-servicos-profissionais`;
- frontend: `feature/chatbot-d03-opcoes-servico`.

### Requisitos

- RF-CHAT-05;
- RN-CHAT-07;
- RNF-CHAT-06, RNF-CHAT-12, RNF-CHAT-13 e RNF-CHAT-17.

### Backend — arquivos que entram integralmente

- `src/services/bot/states/ColetandoServicoState.ts`;
- `src/utils/nlp.util.ts`;
- `src/utils/format.util.ts`;
- `migrations/20260723100001-add-appointment-service-rating-index.js`.

### Backend — arquivos compartilhados que entram por trechos

- `src/models/Appointment.ts`: somente declaração do índice correspondente;
- `src/services/botConversation.service.ts`: transição para serviço;
- `src/services/bot/BotSessionManager.ts`: contexto de serviço/profissional;
- `src/services/bot/states/InicioState.ts`: entrada na intenção de agendar;
- `src/controllers/botChat.controller.ts`: serialização das opções, se necessária.

### Frontend — arquivos que entram integralmente

- `src/components/features/ChatBot/ServiceOptions/ServiceOptions.tsx`;
- `src/components/features/ChatBot/ServiceOptions/index.ts`;
- `src/components/features/ChatBot/ServiceOptions/styles.ts`.

### Frontend — arquivos compartilhados que entram por trechos

- `src/stores/ChatBot/types.ts`: `ChatBotServiceOption`;
- `src/hooks/useChatSession.ts`: seleção da opção;
- `src/components/features/ChatBot/ChatWindow/ChatWindow.tsx`: renderização;
- `src/components/features/ChatBot/ChatWindow/MessageBubble/MessageBubble.tsx`:
  apresentação da resposta com opções.

### Critério de aceite

- encontra serviço por título, categoria e termo compatível;
- erro de grafia dentro da regra definida possui tratamento determinístico;
- não confunde uma intenção fora do domínio com serviço;
- resposta usa serviço e profissional existentes no banco;
- opção mostra preço, duração, localização e avaliação do serviço;
- seleção preserva exatamente `service_id` e `professional_id` escolhidos;
- índice da migration e model Sequelize permanecem equivalentes.

## 9. D04A — antecedência mínima de agendamento

### Branch backend

`feature/appointments-minimum-advance`

### Requisitos

- RF-CHAT-19;
- RN-CHAT-11;
- RNF-CHAT-07 e RNF-CHAT-12.

### Arquivo backend

- somente o hunk da antecedência em
  `src/controllers/appointment.controller.ts`.

### Decisão obrigatória antes da implementação

Definir se a regra significa:

- 48 horas exatas a partir do instante atual; ou
- dois dias de calendário a partir da data atual.

O código, a mensagem e os testes devem usar a mesma interpretação.

### Critério de aceite

- regra aprovada como global, pois o endpoint atende chat e fluxo tradicional;
- limite testado imediatamente antes, exatamente no limite e após o limite;
- timezone documentado;
- aplicativo apresenta o erro sem interromper outras funcionalidades.

Se a equipe não aprovar a regra global, este hunk não deve ser levado para as
PRs do chatbot.

## 10. D04 — datas, horários, disponibilidade e criação `pending`

### Branches sugeridas

- backend: `feature/chatbot-d04-agendamento-natural`;
- frontend: `feature/chatbot-d04-agendamento-ui`.

### Dependências

- D02 e D03 integradas;
- decisão da D04A registrada.

### Requisitos

- RF-CHAT-06, RF-CHAT-07 e RF-CHAT-16;
- RN-CHAT-02, RN-CHAT-06 e RN-CHAT-08;
- RNF-CHAT-06, RNF-CHAT-07, RNF-CHAT-10, RNF-CHAT-12 e RNF-CHAT-17.

### Backend — arquivos que entram integralmente

- `src/utils/date.util.ts`;
- `src/utils/__tests__/date.util.test.ts`;
- `src/services/availability.service.ts`;
- `src/services/bot/states/ColetandoDataState.ts`;
- `src/services/bot/states/ColetandoHorarioState.ts`;
- `src/services/bot/states/stateHelpers.ts`.

### Backend — arquivos compartilhados que entram por trechos

- `src/controllers/professional.controller.ts`: remover função local e importar
  `getAvailableSlots`;
- `src/services/bot/states/ConfirmacaoState.ts`: confirmação de novo agendamento;
- `src/services/bot/states/appointmentActions.ts`: somente criação `pending`;
- `src/services/botConversation.service.ts`: transições de data/hora/confirmação;
- `src/services/bot/BotSessionManager.ts`: contexto de data/hora/slot;
- `src/controllers/botChat.controller.ts`: resposta estruturada de slots.

### Frontend — arquivos que entram integralmente

- `src/lib/helpers/datetime.ts`;
- `src/components/features/ChatBot/QuickReplies/*`;
- base de `src/components/features/ChatBot/ChatBotAppointmentCard/*`.

### Frontend — arquivos compartilhados que entram por trechos

- `src/stores/ChatBot/types.ts`: data, horário, slot e resumo;
- `src/hooks/useChatSession.ts`: envio/seleção de data e horário;
- `ChatWindow.tsx`: quick replies, slots e resumo;
- `MessageBubble.tsx`: mensagens estruturadas;
- `ChatBotAppointmentCard.tsx`: confirmar criação, sem cancelar/reagendar/pagar.

### Critério de aceite

- entende data absoluta, próxima semana e dias da semana;
- diferencia “sexta” e “próxima sexta” conforme regra documentada;
- entende períodos manhã/tarde/noite e horários compatíveis;
- usa timezone validado e persiste UTC;
- disponibilidade considera duração, serviço, profissional, bloqueios e
  agendamentos `pending/confirmed`;
- busca tradicional e chatbot retornam slots coerentes;
- confirmação explícita cria um único agendamento `pending`;
- concorrência pelo mesmo slot é rejeitada ou serializada com segurança.

## 11. D05 — consulta, cancelamento e reagendamento

### Branches sugeridas

- backend: `feature/chatbot-d05-gerenciar-agendamentos`;
- frontend: `feature/chatbot-d05-acoes-agendamento`.

### Requisitos

- RF-CHAT-08, RF-CHAT-09, RF-CHAT-10, RF-CHAT-11 e RF-CHAT-12;
- RN-CHAT-01, RN-CHAT-09 e RN-CHAT-10;
- RNF-CHAT-02, RNF-CHAT-06, RNF-CHAT-07 e RNF-CHAT-10.

### Backend — arquivo que entra integralmente

- `src/services/bot/states/AguardandoIdAgendamentoState.ts`.

### Backend — arquivos compartilhados que entram por trechos

- `InicioState.ts`: consulta/cancelamento/reagendamento;
- `ConfirmacaoState.ts`: confirmação das ações;
- `appointmentActions.ts`: cancelar e reagendar;
- `BotSessionManager.ts`: pergunta pendente, TTL e troca de intenção;
- `botConversation.service.ts`: transições dessas ações;
- `botChat.controller.ts`: histórico e `clear_history`, quando relacionados;
- `src/routes/chat.routes.ts`: endpoints de sessão/histórico ainda não entregues.

### Frontend — arquivos compartilhados que entram por trechos

- `ChatBotAppointmentCard.tsx`: ações Alterar e Cancelar;
- `ChatWindow.tsx`: modal e fluxo das ações;
- `useChatSession.ts`: confirmação, retry e limpeza definitiva;
- `stores/ChatBot/ChatBot.ts`: estado dessas ações;
- `ChatHeader.tsx`: reinício confirmado pelo backend;
- `stores/ChatBot/types.ts`: contratos de consulta e alteração.

### Critério de aceite

- consulta lista somente agendamentos do cliente autenticado;
- cancelamento exige confirmação explícita;
- reagendamento revalida disponibilidade e preserva o agendamento correto;
- outro cliente não consulta nem altera o agendamento;
- “sim” e “não” obedecem à pergunta pendente;
- reinício não restaura a sessão encerrada;
- sessão expirada não reaparece como ativa.

## 12. D06 — aceite, recusa, expiração e tempo real

### Branches sugeridas

- backend: `feature/chatbot-d06-status-tempo-real`;
- frontend: `feature/chatbot-d06-status-agenda`.

### Requisitos

- RF-CHAT-13, RF-CHAT-15 e RF-CHAT-20;
- RN-CHAT-03 e RN-CHAT-09;
- RNF-CHAT-02, RNF-CHAT-04, RNF-CHAT-05, RNF-CHAT-10,
  RNF-CHAT-17 e RNF-CHAT-19.

### Backend — arquivos que entram integralmente

- `src/services/bot/states/AguardandoConfirmacaoState.ts`;
- `src/services/botAppointmentStatus.helpers.ts`;
- `src/services/botAppointmentStatus.service.ts`, sem pagamento da D07;
- `src/services/__tests__/botAppointmentStatus.service.test.ts`.

### Backend — arquivos compartilhados que entram por trechos

- `src/controllers/appointment.controller.ts`: ownership do profissional,
  aceite/recusa e sincronização;
- `src/routes/appointment.routes.ts`: autenticação da confirmação;
- `src/jobs/appointmentCron.ts`: sincronização da expiração;
- `src/realtime/chatSocket.ts`: canal por usuário e evento
  `appointment:status`;
- `src/controllers/botChat.controller.ts`: consulta de status;
- `src/routes/chat.routes.ts`: endpoint de status;
- `BotSessionManager.ts` e `botConversation.service.ts`: estado de espera.

### Frontend — arquivos que entram integralmente

- `src/hooks/useAppointmentStatusSocket.ts`;
- `src/components/features/ChatBot/ChatWindow/hooks/useAppointmentPolling.ts`;
- `src/components/features/ChatBot/ChatWindow/AppointmentStatusBanner/*`,
  ainda sem botão de pagamento.

### Frontend — arquivos compartilhados que entram por trechos

- `useChatSession.ts`: consumir e deduplicar mudança de status;
- `ChatWindow.tsx`: renderizar banner de status;
- `stores/ChatBot/types.ts`: payload do evento;
- `MeusAgendamentos.tsx`: recarregar a agenda;
- `AppointmentCard.tsx`: distinguir pendente, confirmado e cancelado, sem
  introduzir pagamento da D07.

### Critério de aceite

- somente o profissional responsável aceita ou recusa;
- estado é salvo antes de emitir o socket;
- chatbot e agenda atualizam automaticamente;
- polling recupera evento perdido;
- reconexão não duplica mensagens;
- expiração de 12 horas aparece como cancelamento automático;
- falha no push não reverte estado persistido;
- logs não expõem token nem conteúdo sensível.

## 13. D07 — pagamento do agendamento aceito

### Branches sugeridas

- backend: `feature/chatbot-d07-pagamento`;
- frontend: `feature/chatbot-d07-checkout`.

### Dependência

D06 deve estar integrada e validada.

### Requisitos

- RF-CHAT-14, RF-CHAT-15 e parte do RF-CHAT-18;
- RN-CHAT-04 e RN-CHAT-05;
- RNF-CHAT-02, RNF-CHAT-04, RNF-CHAT-10, RNF-CHAT-17 e RNF-CHAT-19.

### Backend — arquivos compartilhados que entram por trechos

- `src/controllers/payment.controller.ts`: receber `appointmentId` e derivar
  identidade do token;
- `src/services/payment.service.ts`: atualizar agendamento existente e
  sincronizar pagamento;
- `src/services/botAppointmentStatus.service.ts`: estado pago;
- `src/realtime/chatSocket.ts`: payload de pagamento, se ainda não estiver no
  contrato entregue na D06.

### Frontend — arquivos que entram integralmente nesta etapa

- `src/screens/public/CheckoutScreen/CheckoutScreen/CheckoutScreen.tsx`;
- `src/screens/public/CheckoutScreen/CheckoutScreen/CheckoutScreen.web.tsx`.

### Frontend — arquivos compartilhados que entram por trechos

- `AppointmentStatusBanner.tsx`: botão Pagar e Ver Agenda;
- `AppointmentCard.tsx`: “Pagamento pendente” e botão Pagar;
- `screens/types.ts`: `appointmentId` no checkout;
- `navigationRef.ts`: navegação ao checkout/agenda;
- `ChatWindow.tsx` ou `ChatWidget.tsx`: minimizar antes da navegação;
- `useChatSession.ts`: sincronização do estado pago.

### Correções obrigatórias antes da PR

O backend deve validar explicitamente:

- agendamento pertence ao cliente autenticado;
- status é `confirmed`;
- ainda não existe pagamento;
- serviço e profissional conferem com o agendamento;
- valor é derivado do serviço confiável, não aceito livremente do frontend;
- repetição de confirmação/webhook é idempotente.

### Critério de aceite

- cliente incorreto recebe acesso negado;
- não é possível pagar agendamento `pending`, cancelado ou já pago;
- pagamento atualiza o mesmo agendamento;
- nenhum agendamento duplicado é criado;
- falha após cobrança possui estratégia consistente de compensação;
- chat minimiza antes de abrir checkout;
- web, Android e iOS concluem o fluxo;
- agenda e chatbot apresentam “pago e confirmado”.

## 14. D08 — dados, testes, homologação e limpeza

### Branches sugeridas

- backend: `chore/chatbot-demo-data`;
- backend: `test/chatbot-integracao`;
- frontend: `test/chatbot-cross-platform`;
- documentação: `docs/chatbot-entrega-final`.

### Requisitos

- RNF-CHAT-03, RNF-CHAT-10, RNF-CHAT-14, RNF-CHAT-15,
  RNF-CHAT-18 e RNF-CHAT-19.

### Backend — seeders

- `seeders/007-initial-reformas-services.js`;
- `seeders/010-demo-professional-services.js`;
- `seeders/012-initial-availabilities.js`;
- `seeders/20260527200000-initial-service-availabilities.js`;
- `seeders/20260723130000-chatbot-service-scenario.js`;
- `seeders/20260812200000-demo-professional-availabilities.js`.

### Backend — arquivos a converter ou remover

- `scratch/test-my-services-endpoint.ts`: converter em teste automatizado ou
  não levar para `stag`;
- `tests/.gitkeep`: não levar se a pasta já possuir testes;
- `src/constants/botMessages.ts`: utilizar como catálogo real ou não levar;
- artefatos treinados: manter ignorados.

### Testes que devem existir ao final

- Python: pré-processamento, modelo, treino e classificação;
- Node: NLU, datas, sessão, ownership, reinício, serviço, disponibilidade,
  criação, cancelamento, reagendamento, status e pagamento;
- integração: backend Node com serviço Python;
- integração: aceite/recusa com Socket.IO desligado e polling ativo;
- integração: pagamento de agendamento existente;
- frontend: store, hook, reinício, renderização de opções e atualização de
  status;
- manual: web, Android e iOS;
- regressão: login, GPS/mapas, serviços, agenda tradicional e pagamento
  tradicional.

### Critério de aceite

- migrations e seeders executam em instalação limpa;
- seeders são idempotentes ou possuem limpeza/identificação segura;
- cenário de demonstração não depende de cadastros manuais;
- lint e testes de todos os runtimes passam;
- documentação contém métricas reais e limitações;
- nenhum arquivo temporário, segredo ou dado pessoal entra na PR.

## 15. D09 — tooling `.codex`

### Branches sugeridas

- frontend: `chore/frontend-codex-agents`;
- backend: `chore/backend-codex-agents`.

### Requisito

- RNF-CHAT-16.

### Frontend

- `.codex/agents/frontend-engineer.toml`;
- `.codex/config.toml`.

### Backend

- `.codex/agents/backend-engineer.toml`;
- `.codex/agents/database-engineer.toml`;
- `.codex/config.toml`.

### Critério de aceite

- equipe concorda em versionar configurações da ferramenta;
- arquivos não contêm credenciais ou caminhos pessoais;
- configuração não interfere em build, runtime ou deploy;
- PR classificada como `chore`, sem alegar funcionalidade de produto.

## 16. Arquivos que exigem divisão por trechos

Esses arquivos não devem ser copiados integralmente da `feature/chatbot` para
uma entrega inicial:

| Repositório | Arquivo | Entregas que o modificam |
| --- | --- | --- |
| Frontend | `src/hooks/useChatSession.ts` | D02, D03, D04, D05, D06 e D07 |
| Frontend | `src/stores/ChatBot/types.ts` | D02 a D07 |
| Frontend | `ChatWindow/ChatWindow.tsx` | D02 a D07 |
| Frontend | `MessageBubble/MessageBubble.tsx` | D02, D03 e D04 |
| Frontend | `ChatBotAppointmentCard.tsx` | D04, D05 e D07 |
| Frontend | `AppointmentStatusBanner.tsx` | D06 e D07 |
| Frontend | `AppointmentCard.tsx` | D06 e D07 |
| Frontend | `screens/types.ts` | D02, D03, D04 e D07 |
| Frontend | `navigationRef.ts` | D02 e D07 |
| Backend | `BotSessionManager.ts` | D02 a D06 |
| Backend | `botConversation.service.ts` | D02 a D06 |
| Backend | `InicioState.ts` | D02, D03 e D05 |
| Backend | `ConfirmacaoState.ts` | D04 e D05 |
| Backend | `appointmentActions.ts` | D04 e D05 |
| Backend | `botChat.controller.ts` | D02 a D06 |
| Backend | `chat.routes.ts` | D02, D05 e D06 |
| Backend | `appointment.controller.ts` | D04A, D06 e correções de segurança |
| Backend | `botAppointmentStatus.service.ts` | D06 e D07 |
| Backend | `payment.service.ts` | D07 |

## 17. Ordem entre backend e frontend em cada entrega

Para D02 até D07:

1. aprovar o contrato da entrega;
2. criar a branch backend a partir da `origin/stag` atualizada;
3. extrair somente os arquivos/trechos autorizados;
4. executar migrations e testes necessários;
5. abrir e revisar a PR backend;
6. mesclar e disponibilizar o backend em integração;
7. criar a branch frontend a partir da nova `origin/stag`;
8. extrair somente o consumidor daquele contrato;
9. testar frontend contra o backend real;
10. abrir e revisar a PR frontend;
11. mesclar e iniciar a próxima entrega.

O backend deve manter compatibilidade com o frontend atualmente publicado até
que a PR frontend correspondente seja integrada. Novos campos devem ser
aditivos sempre que possível.

## 18. Checklist para montar cada branch

Antes de editar:

- confirmar repositório correto;
- confirmar `git status` limpo;
- atualizar `origin/stag`;
- criar branch com nome da entrega;
- registrar os IDs RF/RNF que poderão entrar.

Durante a extração:

- copiar arquivo completo apenas quando exclusivo;
- usar seleção por trechos em arquivos compartilhados;
- não copiar formatação ou imports de requisitos futuros;
- revisar dependências e imports depois de cada arquivo;
- manter uma lista permitida de arquivos da PR.

Antes do commit:

```bash
git status --short
git diff --name-status origin/stag...HEAD
git diff --check
```

Também verificar:

- nenhum arquivo de entrega futura apareceu no diff;
- nenhum import referencia arquivo ainda não entregue;
- migrations estão na ordem correta;
- testes diretamente relacionados foram incluídos;
- mensagens de commit estão em português e identificam o requisito.

Exemplo de commit:

```text
feat(chatbot): implementar sessão autenticada e reinício da conversa

- adiciona persistência de sessões e mensagens
- restringe histórico ao usuário autenticado
- implementa restauração e limpeza definitiva da sessão
- atende RF-CHAT-11, RF-CHAT-12 e RNF-CHAT-02
```

## 19. Checklist para descrição de cada PR

Toda PR parcial deve informar:

- entrega: `Dxx`;
- RFs, RNFs e regras de negócio atendidos;
- objetivo funcional;
- arquivos/grupos incluídos;
- arquivos deliberadamente excluídos;
- dependência de PR backend/frontend;
- migrations e impacto no banco;
- contrato HTTP/Socket alterado;
- evidências de testes;
- riscos e estratégia de rollback;
- itens que continuarão na `feature/chatbot` para entregas futuras.

## 20. Alternativa para trabalho paralelo: PRs empilhadas

Se a equipe precisar desenvolver várias entregas antes dos merges, pode usar
branches empilhadas:

```text
stag <- D02 <- D03 <- D04
```

Nesse caso:

- a PR D02 aponta para `stag`;
- a PR D03 aponta temporariamente para a branch D02;
- a PR D04 aponta temporariamente para a branch D03;
- após cada merge, a próxima branch é rebaseada/atualizada e a base da PR é
  alterada para a nova `stag`.

Essa alternativa permite paralelismo, mas aumenta o trabalho de rebase e o
risco de uma mudança da primeira PR afetar todas as seguintes. Para esta
feature, a entrega sequencial a partir da `stag` é a opção mais segura.

## 21. Condição para encerrar a branch grande

A `feature/chatbot` deve permanecer preservada como referência até que:

- todas as entregas D00–D08 tenham destino definido;
- todos os RFs/RNFs tenham sido aceitos ou formalmente removidos do escopo;
- os 54 arquivos frontend e 77 backend estejam mesclados, substituídos ou
  explicitamente descartados;
- testes e documentação final estejam integrados;
- não existam trechos exclusivos apenas na branch grande.

Somente então a branch original poderá ser arquivada ou removida conforme a
política da equipe. Este plano não autoriza merge, fechamento ou exclusão das
PRs atuais.
