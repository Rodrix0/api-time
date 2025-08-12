# 🕐 API de Tiempo

API REST que proporciona la hora actual con diferentes formatos, construida con Express.js y Docker.

## 🚀 Características

- **Endpoint principal**: `/` - Información de la API
- **Hora con segundos**: `/time` - Hora actual con segundos
- **Hora completa**: `/time/full` - Hora con milisegundos
- **Formato ISO**: `/time/iso` - Timestamp en formato ISO
- **Zona horaria**: Configurada para Argentina (Buenos Aires)
- **Sin caché**: Respuestas siempre actualizadas

## 🛠️ Tecnologías

- Node.js 18
- Express.js 4.18.2
- Docker
- Alpine Linux

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd api-time

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start
```

## 🐳 Docker

### Construir imagen
```bash
docker build -t api-time .
```

### Ejecutar contenedor
```bash
docker run -p 3000:3000 api-time
```

### Con Docker Compose
```bash
docker-compose up --build
```

## 🌐 Uso de la API

### Endpoints disponibles

#### GET `/`
Información general de la API
```json
{
  "message": "API de Tiempo",
  "endpoints": {
    "/time": "Obtener hora actual con segundos",
    "/time/full": "Obtener hora completa con milisegundos",
    "/time/iso": "Obtener hora en formato ISO"
  }
}
```

#### GET `/time`
Hora actual con segundos
```json
{
  "hora": "20",
  "minutos": "37",
  "segundos": "29",
  "timestamp": 1755041849257,
  "zonaHoraria": "America/Buenos_Aires"
}
```

#### GET `/time/full`
Hora completa con milisegundos
```json
{
  "hora": "20",
  "minutos": "37",
  "segundos": "34",
  "milisegundos": "290",
  "timestamp": 1755041854290,
  "zonaHoraria": "America/Buenos_Aires",
  "fecha": "12/8/2025",
  "horaCompleta": "20:37:34"
}
```

#### GET `/time/iso`
Formato ISO
```json
{
  "iso": "2025-08-12T23:37:34.290Z",
  "timestamp": 1755041854290,
  "zonaHoraria": "America/Buenos_Aires"
}
```

## 🚀 Despliegue en Render

### Opción 1: Despliegue Automático con render.yaml

1. Conecta tu repositorio de GitHub a Render
2. Render detectará automáticamente el archivo `render.yaml`
3. Se desplegará automáticamente

### Opción 2: Despliegue Manual

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Crea un nuevo **Web Service**
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name**: `api-time`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./Dockerfile`
   - **Health Check Path**: `/time`
   - **Port**: `3000`

### Variables de Entorno
- `NODE_ENV`: `production`
- `PORT`: `3000`
- `TZ`: `America/Argentina/Buenos_Aires`

## 🔧 Variables de Entorno

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Entorno de ejecución |
| `PORT` | `3000` | Puerto del servidor |
| `TZ` | `America/Argentina/Buenos_Aires` | Zona horaria |

## 📊 Health Check

La API incluye un health check automático en el endpoint `/time` que Render puede usar para monitorear el estado del servicio.

## 🐛 Troubleshooting

### El contenedor no inicia
```bash
# Ver logs
docker logs api-time-container

# Verificar estado
docker ps -a
```

### Puerto ocupado
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"
```

## 📝 Licencia

MIT License
