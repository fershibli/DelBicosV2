# Usar a versão do Node.js especificada no .nvmrc
FROM node:22.15.1-alpine

# Instalar dependências do sistema necessárias para Expo
RUN apk add --no-cache \
    git \
    bash \
    curl

# Definir diretório de trabalho
WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g expo-cli@latest eslint typescript

# Copiar package.json e lockfile (se existir)
COPY package.json */package-lock.json* ./

# Instalar dependências baseado no lockfile presente
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor portas
# 8081 - Metro bundler
# 19000 - Expo DevTools
# 19001 - Expo DevTools (WebSocket)
# 19002 - Expo DevTools (ngrok)
EXPOSE 8081 19000 19001 19002

# Container em idle
CMD ["tail", "-f", "/dev/null"]