Testando o Docker (local e remoto)

Este arquivo descreve passos rápidos para testar a imagem Docker localmente e como o workflow remoto (GitHub Actions -> DockerHub) deve funcionar.

1) Pré-requisitos
- Docker instalado (Docker Desktop)
- Credenciais DockerHub configuradas no GitHub (secrets): DOCKERHUB_USERNAME e DOCKERHUB_TOKEN

2) Teste local (build estático)

Observação: este repositório é um projeto Expo. Se você ainda não gera uma pasta estática (web-build/build/dist), execute o comando de build apropriado antes de rodar o Docker.

Exemplo genérico (ajuste o comando de build conforme seu fluxo):

1) gerar build web (substitua pelo comando correto do seu projeto):
   - npm run build:web   # ou expo export:web --output-dir web-build

2) construir a imagem localmente:
   - docker build -t $DOCKERHUB_USERNAME/${GITHUB_REPO_NAME:-delbicos-frontend}:local .

3) rodar a imagem localmente:
   - docker run --rm -p 8080:80 $DOCKERHUB_USERNAME/${GITHUB_REPO_NAME:-delbicos-frontend}:local

Abra http://localhost:8080 no navegador.

3) Teste local (modo desenvolvimento com Expo)

Se quiser rodar a app em modo desenvolvimento dentro de container (não recomendado para produção):

1) construir imagem que roda o dev server (ajuste Dockerfile se necessário):
   - docker build -t delbicos-dev:local -f Dockerfile.dev .
2) rodar o container:
   - docker run --rm -p 19006:19006 delbicos-dev:local

4) Teste remoto (GitHub Actions -> DockerHub)

- Certifique-se de adicionar as secrets no GitHub: DOCKERHUB_USERNAME e DOCKERHUB_TOKEN (token do DockerHub).
- O workflow .github/workflows/docker-ci.yml está configurado para rodar em push para main. Para testar sem usar main, crie uma PR contra main ou ajuste temporariamente o on.push.branches.
- Quando acionado, o workflow:
  1. Faz login no DockerHub
  2. Constrói a imagem usando o Dockerfile na raiz
  3. Dá push para ${ { secrets.DOCKERHUB_USERNAME } }/${ { github.event.repository.name } }:latest

5) Dicas e problemas comuns
- Se o workflow falhar no login: verifique as secrets e que o token tem permissões.
- Se o build falhar porque não existe pasta build/web-build: ajuste o Dockerfile ou adicione um script de build no package.json que gere a saída esperada.
- Use .dockerignore para reduzir o contexto de build e acelerar a ação.

6) Exemplo rápido de comandos para desenvolvedores

1) build local e rodar:
   - npm run web   # (ou comando de build do seu projeto)
   - docker build -t meuuser/delbicos-frontend:local .
   - docker run --rm -p 8080:80 meuuser/delbicos-frontend:local

-----
Arquivo gerado automaticamente pelo setup de DockerHub. Ajuste os comandos conforme seu fluxo (Expo vs SPA tradicional).
