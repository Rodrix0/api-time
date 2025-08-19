// Configuración de la API - Detecta automáticamente el entorno
const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://api-time.onrender.com';

// Elementos del DOM
const timeDisplay = document.getElementById('timeDisplay');
const getTimeBtn = document.getElementById('getTimeBtn');
const statusDiv = document.getElementById('status');

// Función para mostrar mensajes de estado
function showStatus(message, type = 'success') {
  statusDiv.textContent = message;
  statusDiv.className = type;
  statusDiv.style.display = 'block';
  
  // Ocultar el mensaje después de 3 segundos
  setTimeout(() => {
    statusDiv.style.display = 'none';
  }, 3000);
}

// Función para mostrar la hora
function displayTime(timeData) {
  const { hora, minutos, segundos, zonaHoraria } = timeData;
  timeDisplay.textContent = `${hora}:${minutos}:${segundos}`;
  timeDisplay.className = 'time-display show';
  
  // Mostrar información adicional
  showStatus(`Hora obtenida exitosamente - Zona horaria: ${zonaHoraria}`, 'success');
}

// Función para obtener la hora desde la API
async function getTime() {
  try {
    // Cambiar estado del botón
    getTimeBtn.disabled = true;
    getTimeBtn.innerHTML = '<span class="loading"></span>Obteniendo hora...';
    
    // Ocultar hora anterior si existe
    timeDisplay.className = 'time-display hidden';
    
    // Realizar petición a la API
    const response = await fetch(`${API_BASE_URL}/time`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const timeData = await response.json();
    
    // Mostrar la hora con una pequeña animación
    setTimeout(() => {
      displayTime(timeData);
    }, 300);
    
  } catch (error) {
    console.error('Error al obtener la hora:', error);
    showStatus(`Error: ${error.message}`, 'error');
    
    // Ocultar el display de hora en caso de error
    timeDisplay.className = 'time-display hidden';
  } finally {
    // Restaurar estado del botón
    getTimeBtn.disabled = false;
    getTimeBtn.innerHTML = 'Obtener Hora';
  }
}

// Función para verificar si la API está disponible
async function checkApiStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    if (response.ok) {
      showStatus('API conectada correctamente', 'success');
    }
  } catch (error) {
    showStatus('No se puede conectar con la API. Asegúrate de que esté ejecutándose en el puerto 3000.', 'error');
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Verificar estado de la API al cargar la página
  checkApiStatus();
  
  // Agregar evento al botón
  getTimeBtn.addEventListener('click', getTime);
  
  // Agregar evento de tecla Enter
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !getTimeBtn.disabled) {
      getTime();
    }
  });
});

// Función para actualizar la hora en tiempo real (opcional)
function startRealTimeUpdate() {
  setInterval(() => {
    if (timeDisplay.classList.contains('show')) {
      getTime();
    }
  }, 1000);
}

// Comentar la siguiente línea si no quieres actualización automática
// startRealTimeUpdate();
