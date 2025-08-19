# Reloj Digital con API de Tiempo - Paso 2

Esta aplicación consiste en dos contenedores Docker que se ejecutan desde la carpeta `paso2`:

1. **API de Tiempo** - Backend que proporciona la hora actual (construido desde el directorio padre)
2. **Frontend** - Interfaz web que consume la API (construido desde la carpeta actual)

## Características

- ✅ Contenedores Docker separados para API y frontend
- ✅ La hora solo se muestra cuando presionas el botón
- ✅ Diseño moderno y responsivo
- ✅ Animaciones suaves
- ✅ Manejo de errores
- ✅ Verificación de conectividad con la API

## Requisitos

- Docker
- Docker Compose

## Instalación y Uso

### 1. Navegar a la carpeta paso2

```bash
cd api-time/paso2
```

### 2. Ejecutar con Docker Compose

```bash
docker-compose up --build
```

### 3. Acceder a la aplicación

- **Frontend**: http://localhost
- **API**: http://localhost:3000

## Estructura del Proyecto

```
api-time/
├── index.js              # API de tiempo
├── package.json          # Dependencias de la API
├── Dockerfile            # Contenedor de la API
├── paso2/                # Frontend
│   ├── index.html        # Página principal
│   ├── styles.css        # Estilos CSS
│   ├── script.js         # Lógica JavaScript
│   ├── Dockerfile        # Contenedor del frontend
│   ├── docker-compose.yml # Orquestación
│   └── README.md         # Este archivo
└── ...
```

## Endpoints de la API

- `GET /` - Información de la API
- `GET /time` - Hora actual con segundos
- `GET /time/full` - Hora completa con milisegundos
- `GET /time/iso` - Hora en formato ISO

## Funcionalidades del Frontend

- Botón para obtener la hora actual
- Display de hora con formato HH:MM:SS
- Mensajes de estado (éxito/error)
- Verificación automática de conectividad con la API
- Diseño responsivo para móviles

## Comandos Útiles

```bash
# Desde la carpeta paso2
cd api-time/paso2

# Construir y ejecutar
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir solo un servicio
docker-compose up --build frontend
```

## Solución de Problemas

### La API no responde
- Verifica que el contenedor `api-time` esté ejecutándose
- Revisa los logs: `docker-compose logs api-time`
- Asegúrate de estar ejecutando desde la carpeta `paso2`

### El frontend no se conecta
- Asegúrate de que ambos contenedores estén en la misma red
- Verifica que la API esté disponible en el puerto 3000
- Comprueba que las rutas en `docker-compose.yml` sean correctas

### Error de CORS
- La API ya incluye headers CORS configurados
- Si persiste, verifica que estés accediendo desde el puerto correcto

## Notas Importantes

- **Ejecutar desde paso2**: Siempre ejecuta `docker-compose` desde la carpeta `paso2`
- **Rutas relativas**: El `docker-compose.yml` usa `..` para construir la API desde el directorio padre
- **Puertos**: El frontend usa el puerto 80, la API usa el puerto 3000
