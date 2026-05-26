# Etapa 1: Build web do Expo
FROM node:22.15.1-alpine AS builder

RUN apk add --no-cache git bash curl

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Gera o build estático para web
RUN pnpm exec expo export --platform web

# Etapa 2: Servir com nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]