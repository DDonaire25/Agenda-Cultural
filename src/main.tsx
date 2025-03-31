let eventos = JSON.parse(localStorage.getItem("eventosGuardados")) || [];
let indiceEdicion = null;

// Función para guardar/editar eventos
function guardarEvento() {
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const lugar = document.getElementById("lugar").value;
  const fecha = document.getElementById("fecha").value;
  const categoria = document.getElementById("categoria").value;

  const nuevoEvento = { titulo, descripcion, lugar, fecha, categoria };

  if (indiceEdicion !== null) {
    eventos[indiceEdicion] = nuevoEvento; // Editar
    indiceEdicion = null;
  } else {
    eventos.push(nuevoEvento); // Crear nuevo
  }

  localStorage.setItem("eventosGuardados", JSON.stringify(eventos));
  mostrarEventos();
}

// Función para mostrar eventos
function mostrarEventos() {
  const contenedor = document.getElementById("eventos-programados");
  contenedor.innerHTML = eventos.map((evento, index) => `
    <div class="evento">
      <h3>${evento.titulo}</h3>
      <p>${evento.descripcion}</p>
      <button onclick="editarEvento(${index})">Editar</button>
      <button onclick="eliminarEvento(${index})">Eliminar</button>
    </div>
  `).join("");
}

// Funciones de edición y eliminación
function editarEvento(index) { ... }
function eliminarEvento(index) { ... }
function filtrarEventos() { ... }
