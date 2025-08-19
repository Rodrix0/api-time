const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'API de Tiempo',
    endpoints: {
      '/time': 'Obtener hora actual con segundos',
      '/time/full': 'Obtener hora completa con milisegundos',
      '/time/iso': 'Obtener hora en formato ISO'
    }
  });
});

// Ruta para obtener la hora con segundos
app.get('/time', (req, res) => {
  const now = new Date();
  const payload = {
    hora: now.getHours().toString().padStart(2, '0'),
    minutos: now.getMinutes().toString().padStart(2, '0'),
    segundos: now.getSeconds().toString().padStart(2, '0'),
    timestamp: now.getTime(),
    zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.json(payload);
});

// Ruta para obtener la hora completa con milisegundos
app.get('/time/full', (req, res) => {
  const now = new Date();
  const payload = {
    hora: now.getHours().toString().padStart(2, '0'),
    minutos: now.getMinutes().toString().padStart(2, '0'),
    segundos: now.getSeconds().toString().padStart(2, '0'),
    milisegundos: now.getMilliseconds().toString().padStart(3, '0'),
    timestamp: now.getTime(),
    zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone,
    fecha: now.toLocaleDateString('es-ES'),
    horaCompleta: now.toLocaleTimeString('es-ES', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };
  
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.json(payload);
});

// Ruta para obtener la hora en formato ISO
app.get('/time/iso', (req, res) => {
  const now = new Date();
  const payload = {
    iso: now.toISOString(),
    timestamp: now.getTime(),
    zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.json(payload);
});
//hhhfff
// Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: 'Usa /time para obtener la hora actual'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API de Tiempo escuchando en http://localhost:${PORT}`);
  console.log(`📅 Endpoints disponibles:`);
  console.log(`   - GET /time (hora con segundos)`);
  console.log(`   - GET /time/full (hora completa con milisegundos)`);
  console.log(`   - GET /time/iso (formato ISO)`);
});
