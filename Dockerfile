# Utiliza una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json .

# Instala las dependencias del proyecto
RUN npm install

# Copia todos los archivos de tu aplicación al directorio de trabajo
COPY . .

# Compila tu aplicación React (cambia esto según tu configuración)
RUN npm run build

# Expón un puerto en el contenedor (generalmente 80)
EXPOSE 3000

# Inicia la aplicación cuando se ejecute el contenedor
CMD [ "npm", "start" ]
