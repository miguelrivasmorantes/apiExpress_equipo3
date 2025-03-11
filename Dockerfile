# Usa la imagen oficial de Node con Alpine
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json e instala dependencias
COPY package*.json ./
RUN npm install --production

# Copia el resto de la aplicación
COPY . .

# Comando de inicio
CMD ["npm", "run", "dev"]
