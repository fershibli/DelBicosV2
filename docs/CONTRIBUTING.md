# Guia de Contribuição

Obrigado por contribuir para o nosso projeto! Sua ajuda é muito apreciada. Aqui estão algumas diretrizes para ajudá-lo a começar.

## Como Contribuir

Para contribuir, é necessário ser um contribuidor do projeto.

1. **Clone o repositório:**
   Se você não tiver uma chave SSH configurada, você pode clonar o repositório usando HTTPS:

   ```bash
   git clone https://github.com/fershibli/DelBicosV2.git
   ```

2. **Garanta que sua main esteja atualizada:**
   Antes de começar a trabalhar, certifique-se de que sua branch `main` está atualizada com o repositório remoto:

   ```bash
   git checkout main
   git pull origin main
   ```

3. **Crie uma nova branch:**
   Crie uma nova branch para suas alterações. Use um nome descritivo, como `feat/nova-funcionalidade`, `fix/bug-conhecido`, `docs/atualizacao-documentacao` ou `refactor/melhoria-codigo`:

   ```bash
   git checkout -b nome-da-sua-branch
   ```

4. **Faça suas alterações:**
   Realize as alterações necessárias no código. Certifique-se de seguir as diretrizes de estilo do projeto e adicionar comentários somente onde necessário.
5. **Commit suas alterações:**
   Faça commit das suas alterações com uma mensagem clara e descritiva. Siga o padrão de mensagens de commit [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/). Por exemplo:

   ```bash
   git add .
   git commit -m "feat(nome-do-recurso): descrição breve do que foi feito, de preferência em inglês"
   ```

6. **Envie suas alterações:**
   Envie suas alterações para o repositório remoto:

   ```bash
   git push origin nome-da-sua-branch
   ```

7. **Crie um Pull Request:**
   Vá para o repositório no GitHub e crie um Pull Request (PR) da sua branch para a branch `main`. Descreva suas alterações e por que elas são necessárias.
8. **Aguarde a revisão:**
   Aguarde a revisão do seu PR. Esteja aberto a feedback e pronto para fazer ajustes conforme necessário.
9. **Merge do Pull Request:**
   Após a aprovação do seu PR, ele será mesclado na branch `main`. Se você tiver permissões, poderá fazer isso você mesmo ou solicitar a um mantenedor do projeto.

- OBS: No caso de conflitos de merge, você precisará resolvê-los antes de poder mesclar seu PR. Prefira resolver os conflitos localmente com a estratégia de --no-rebase, para evitar problemas de histórico.

```bash
git pull origin main --no-rebase
git push origin nome-da-sua-branch
```

## Por que criar uma Branch e uma Pull Request?

Criar uma branch para suas alterações e abrir uma Pull Request (PR) é uma prática recomendada no desenvolvimento colaborativo por várias razões:

- **Isolamento de Mudanças:** Permite que você trabalhe em suas alterações sem afetar a branch principal (`main`), evitando conflitos e problemas de integração.
- **Revisão de Código:** Permite que outros contribuidores revisem seu código antes de ser mesclado, garantindo qualidade e consistência.
- **Histórico de Mudanças:** Mantém um histórico claro das alterações feitas, facilitando o rastreamento de bugs e a compreensão do histórico do projeto.
- **Colaboração:** Facilita a colaboração entre os membros da equipe, permitindo discussões sobre as alterações propostas e sugestões de melhorias, antes de serem integradas ao código principal.

## Padrões de Código

Instale e configure o [Prettier](https://prettier.io/) e o [ESLint](https://eslint.org/) para garantir que o código esteja formatado corretamente. Siga as seguintes diretrizes de estilo:

- **Indentação:** Use 2 espaços para indentação. Não use tabs.
- **Comprimento da Linha:** Mantenha o comprimento das linhas abaixo de 80 caracteres.
- **Aspas:** Use aspas simples para strings, a menos que seja necessário usar aspas duplas (por exemplo, em JSON).
- **Ponto e Vírgula:** Use ponto e vírgula no final de cada instrução.
- **Espaços:** Use espaços ao redor de operadores e após vírgulas. Não use espaços antes de vírgulas.
- **Importações:** Organize as importações em ordem alfabética. Agrupe importações de bibliotecas externas, internas e locais.
- **Nomes de Variáveis:** Use nomes de variáveis descritivos e em camelCase. Evite abreviações excessivas.
- **Nomes de Funções:** Use nomes de funções descritivos e em camelCase. As funções devem ser nomeadas de forma que indiquem claramente o que fazem.
- **Classes:** Use PascalCase para nomes de classes. As classes devem ser nomeadas de forma que indiquem claramente seu propósito.
- **Arquivos:** Para arquivos typescript, use PascalCase. Para arquivos de configuração, use kebab-case. Para arquivos de teste, use o sufixo `.test.ts`.
- **Comentários:** Comente o código onde necessário, mas evite comentários óbvios. O código deve ser autoexplicativo sempre que possível.

> Se você configurar o Prettier e o ESLint corretamente, eles ajudarão a manter o código consistente e formatado de acordo com a maioria dessas diretrizes.

## Estrutura de Componentes e Telas React

Os componentes React devem seguir uma estrutura clara e organizada. Aqui estão algumas diretrizes para a criação de componentes:

- **Diretório Dedicado:** Cada código React deve ter seu próprio diretório dentro do diretório `src/components` ou `src/screens`, dependendo se é um componente reutilizável ou uma tela específica.
- **Nome do Diretório:** O nome do diretório deve ser o nome do componente ou tela em PascalCase.
- **Arquivos do Componente:** Dentro do diretório do componente, deve haver pelo menos dois arquivos:
  - `index.tsx`: O arquivo principal do componente, que exporta o componente.
  - `styles.ts`: Um arquivo opcional para estilos específicos do componente, se necessário.
- **Arquivos de Teste:** Se o componente tiver testes, crie um arquivo `index.test.tsx` dentro do diretório do componente.

### Exemplo de estrutura de diretório para um componente React:

```
├── src
│   ├── components
│   │   ├── MeuComponente
│   │   │   ├── MeuComponente.tsx
│   │   │   ├── index.tsx
│   │   │   ├── styles.ts
│   │   │   └── MeuComponente.test.tsx
```

## Diretrizes de Contribuição

- **Código Limpo:** Escreva código limpo e bem organizado. Siga as convenções de nomenclatura e estilo do projeto.
- **Documentação:** Atualize a documentação sempre que fizer alterações significativas no código. Isso inclui comentários no código e atualizações nos arquivos do diretório `docs`.
- **Testes:** Sempre que possível, adicione testes para novas funcionalidades ou correções de bugs. Certifique-se de que todos os testes existentes passem.
- **Respeito:** Seja respeitoso e colaborativo com outros contribuidores. O objetivo é melhorar o projeto juntos.

## Relatando Problemas

Se você encontrar um bug ou tiver uma sugestão de melhoria, por favor, abra uma issue no repositório. Forneça o máximo de detalhes possível, incluindo:

- Descrição do problema ou sugestão
- Passos para reproduzir o problema (se aplicável)
- Comportamento esperado
- Comportamento atual
- Capturas de tela ou logs (se aplicável)
