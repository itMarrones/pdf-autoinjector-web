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

# Crea las carpetas necesarias para subir archivos y guardar los generados
RUN mkdir -p uploads generated

# Expone el puerto 4000 para que el contenedor sea accesible desde fuera
EXPOSE 4000

# Comando por defecto: arranca el servidor Node.js
CMD ["node", "index.js"]