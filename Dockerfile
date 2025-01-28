# Use uma imagem base do Node.js
FROM node:20-alpine

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração do projeto
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm ci

# Copie o resto dos arquivos do projeto
COPY . .

# Construa o aplicativo
RUN npm run build

# Exponha a porta que o aplicativo vai usar
EXPOSE 7171

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
