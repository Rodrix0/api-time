FROM node:18-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache tzdata

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Carpeta de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Copiar el código de la aplicación
COPY . .

# Cambiar permisos al usuario no-root
RUN chown -R nodejs:nodejs /app
USER nodejs

# Configuración de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV TZ=America/Argentina/Buenos_Aires

# Exponer puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/time', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando de arranque
CMD ["npm", "start"]
