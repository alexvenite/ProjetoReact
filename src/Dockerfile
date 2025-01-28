# Etapa 1: Construção da aplicação
FROM node:16 AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependência e instalar
COPY package.json package-lock.json ./
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Copiar a build do React para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]

