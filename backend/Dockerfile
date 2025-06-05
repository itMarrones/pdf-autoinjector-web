# Dockerfile
# Define cómo construir la imagen Docker para el backend Node.js

# Usa Node.js como imagen base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el código del backend al contenedor
COPY . .

# Comando por defecto: arranca el servidor Node.js
CMD ["node", "index.js"]