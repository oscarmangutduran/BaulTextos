// Variables
const listaNotas = document.querySelector('#lista-notas');
const formulario = document.querySelector('#formulario');
let notas = [];

// Event Listeners
eventListeners();

function eventListeners() {
     //Cuando se envia el formulario
     formulario.addEventListener('submit', agregarNota);

     // Borrar Notas
     listaNotas.addEventListener('click', borrarNota);

     // Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          notas = JSON.parse( localStorage.getItem('notas') ) || []  ;
          console.log(notas);
          crearHTML();
     });
}

// Añadir nota del formulario
function agregarNota(evt) {
     evt.preventDefault();
     // leer el valor del textarea
     const nota = document.querySelector('#nota').value;
     
     // validación
     if(nota === '') {
          mostrarError('Una nota no puede estar vacia');
          return;
     }

     // Crear un objeto Nota
     const notaObj = {
          id: Date.now(),
          texto: nota
     }

     // Añadirlo a mis notas
     notas = [...notas, notaObj];
     
     // Una vez agregado, mandamos renderizar nuestro HTML
     crearHTML();

     // Reiniciar el formulario
     formulario.reset();
}

function mostrarError(error) {
     const mensajeEerror = document.createElement('p');
     mensajeEerror.textContent = error;
     mensajeEerror.classList.add('error');

     const contenido = document.querySelector('#contenido');
     contenido.appendChild(mensajeEerror);

     setTimeout(() => {
          mensajeEerror.remove();
     }, 3000);
}

function crearHTML() {
     limpiarHTML();
     
     if(notas.length > 0 ) {
          notas.forEach( notas =>  {
               // crear boton de eliminar
               const botonBorrar = document.createElement('a');
               botonBorrar.classList = 'borrar-nota';
               botonBorrar.innerText = 'X';
     
               // Crear elemento y añadirle el contenido a la lista
               const li = document.createElement('li');

               // Añade el texto
               li.innerText = notas.texto;

               // añade el botón de borrar a la nota
               li.appendChild(botonBorrar);

               // añade un atributo único...
               li.dataset.notaId = notas.id;

               // añade el nota a la lista
               listaNotas.appendChild(li);
          });
     }

     sincronizarStorage();
}

// Elimina el nota del DOM
function borrarNota(e) {
     e.preventDefault();

     // console.log(e.target.parentElement.dataset.notaId);
     const id = e.target.parentElement.dataset.notaId;
     notas = notas.filter( nota => nota.id != id  );
     crearHTML();
}

// Agrega nota a local storage
function sincronizarStorage() {
     localStorage.setItem('notas', JSON.stringify(notas));
}

// Elimina los cursos del carrito en el DOM
function limpiarHTML() {
     while(listaNotas.firstChild) {
          listaNotas.removeChild(listaNotas.firstChild);
     }
}