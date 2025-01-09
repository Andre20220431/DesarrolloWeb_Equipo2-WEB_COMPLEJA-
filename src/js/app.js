const input = document.getElementById('ingresar-tarea');
const boton = document.querySelector('button');
const listaDeTareas = document.getElementById('lista-de-tareas');
const filtro = document.getElementById('filtro');
let tareas = [];

function agregarTarea() {
    if (input.value) {
        /* Crear tarea */
        let tareaNueva = document.createElement('div');
        tareaNueva.classList.add('tarea');

        /* Texto ingresado por el usuario */
        let texto = document.createElement('p');
        texto.innerText = input.value;
        tareaNueva.appendChild(texto);

        /* Crear y agregar contenedor de iconos */
        let iconos = document.createElement('div');
        iconos.classList.add('iconos');
        tareaNueva.appendChild(iconos);

        /* Iconos */
        let completar = document.createElement('i');
        completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
        completar.addEventListener('click', completarTarea);

        let eliminar = document.createElement('i');
        eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
        eliminar.addEventListener('click', eliminarTarea);

        iconos.append(completar, eliminar);

        /* Agregar tarea a la lista */
        listaDeTareas.appendChild(tareaNueva);

        // Guardar tarea en el array
        tareas.push({ elemento: tareaNueva, completada: false });

        // Limpiar input
        input.value = '';
        actualizarFiltro();
    } else {
        alert('Por favor ingrese una tarea.');
    }
}

function completarTarea(e) {
    let tarea = e.target.parentNode.parentNode;
    tarea.classList.toggle('completada');
    let tareaIndex = tareas.findIndex(t => t.elemento === tarea);
    tareas[tareaIndex].completada = !tareas[tareaIndex].completada;
    actualizarFiltro();
}

function eliminarTarea(e) {
    let tarea = e.target.parentNode.parentNode;
    tarea.remove();
    tareas = tareas.filter(t => t.elemento !== tarea); // Eliminar tarea del array
    actualizarFiltro();
}

function actualizarFiltro() {
    const estadoFiltro = filtro.value;
    listaDeTareas.innerHTML = ''; // Limpiar la lista

    let tareasFiltradas;
    if (estadoFiltro === 'completadas') {
        tareasFiltradas = tareas.filter(t => t.completada);
    } else if (estadoFiltro === 'pendientes') {
        tareasFiltradas = tareas.filter(t => !t.completada);
    } else {
        tareasFiltradas = tareas;
    }

    // Agregar las tareas filtradas de nuevo a la lista
    tareasFiltradas.forEach(t => listaDeTareas.appendChild(t.elemento));
}

// Escuchar el evento de filtro
filtro.addEventListener('change', actualizarFiltro);

// Escuchar evento del botón y Enter para agregar tarea
boton.addEventListener('click', agregarTarea);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});
