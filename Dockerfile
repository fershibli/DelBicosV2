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
COPY package.json package-lock.json* ./

# Instalar dependências: usar npm ci quando existir lockfile, fallback para npm install
RUN if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor portas
# 8081 - Metro bundler
# 19000 - Expo DevTools
# 19001 - Expo DevTools (WebSocket)
# 19002 - Expo DevTools (ngrok)
EXPOSE 8081 19000 19001 19002

# Executa o servidor web (modo desenvolvimento para Expo web)
# Ajuste se preferir outro comando (ex: start, android, ios)
CMD ["npm", "run", "web"]