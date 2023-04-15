// Definición de productos y precios
let productos;

fetch("./js/productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data;
    mostrarCarrito();
  })
  .catch(error => console.error(error));

// Obtener los elementos HTML necesarios
const listaProductos = document.getElementById("listaProductos");
const items = document.getElementById("items");
const totalElement = document.getElementById("total");
const mostrarCarritoBtn = document.getElementById("mostrarCarritoButton");

// Función para agregar un producto al carrito
function agregarAlCarrito(nombreProducto) {
  const productoEncontrado = productos.find(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());

  productoEncontrado && carrito.push(productoEncontrado) && mostrarCarrito();
}


function agregarAlCarrito(nombreProducto) {
  const productoEncontrado = productos.find(producto => producto.nombre === nombreProducto);

  carrito.push(productoEncontrado);
  
  const formCarrito = document.getElementById("formCarrito");
  formCarrito.addEventListener("submit", e => {
    e.preventDefault();
    mostrarCarrito();
  });
}

function mostrarCarrito() {
  const listaProductos = document.getElementById("listaProductos");
  listaProductos.innerHTML = "";
  
  carrito.forEach(producto => {
    const li = document.createElement("li");
    li.innerText = producto.nombre + " - $" + producto.precio;
    listaProductos.appendChild(li);
  });

  const carritoTotal = document.getElementById("carritoTotal");
  carritoTotal.classList.remove("oculto");

  total += producto.precio;

    // Actualizar el total
    totalElement.innerText = total;
}

mostrarCarritoBtn.addEventListener("click", () => {
  mostrarCarrito();
});


// Variable para indicar si se ha hecho clic en el botón "Mostrar total"
let seMostroTotal = false;

// Función para mostrar el total del carrito en el elemento HTML
function mostrarTotal() {
  if (seMostroTotal) {
    // Si ya se mostró el total, no hacer nada
    return;
  }

  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
  const totalCarrito = document.getElementById("totalCarrito");
  totalCarrito.innerText = `Total en el carrito: $${total}`;

  // Actualizar la variable para indicar que se ha mostrado el total
  seMostroTotal = true;
}


function mostrarCarrito() {
  const listaProductos = document.getElementById("listaProductos");
  listaProductos.innerHTML = "";
  
  carrito.forEach(producto => {
    const li = document.createElement("li");
    li.innerText = producto.nombre + " - $" + producto.precio;

    const botonEliminar = document.createElement("button");
    botonEliminar.innerText = "Eliminar";
    botonEliminar.dataset.producto = producto.nombre.toLowerCase();
    botonEliminar.addEventListener("click", eliminarDelCarritoHandler);
    li.appendChild(botonEliminar);

    listaProductos.appendChild(li);

    botonEliminar.onclick=()=>{
      Toastify({
        text: "eliminaste un producto de tu carrito.",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #2e2a2e, #212121)",
        }
      }).showToast()
    }
    

  });



  const carritoTotal = document.getElementById("carritoTotal");
  carritoTotal.classList.remove("oculto");

  // Actualizar el total
  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
  totalElement.innerText = total;
}

function eliminarDelCarritoHandler(event) {
  const nombreProducto = event.target.dataset.producto;
  eliminarDelCarrito(nombreProducto);
}

function eliminarDelCarrito(nombreProducto) {
  const index = carrito.findIndex(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());

  if (index !== -1) {
    carrito.splice(index, 1);
    mostrarCarrito();
  }
}


// Manejador de eventos para el botón "Agregar al carrito"
function agregarAlCarritoHandler(event) {
  const nombreProducto = event.target.dataset.producto;
  agregarAlCarrito(nombreProducto);
}

// Manejador de eventos para el botón "Mostrar carrito"
function mostrarCarritoHandler() {
  mostrarCarritoButton.classList.toggle("oculto");
  mostrarCarrito();
}

// Manejador de eventos para el botón "Mostrar total"
function mostrarTotalHandler() {
  mostrarTotal();
}

// Manejador de eventos para el botón "Vaciar carrito"
function vaciarCarritoHandler() {
  carrito.length = 0;
  mostrarCarrito();
}

// Obtener el carrito del localStorage o inicializarlo vacío
const carritoJSON = localStorage.getItem("carrito");
const carrito = carritoJSON ? JSON.parse(carritoJSON) : [];

// Registrar los eventos
const botonesAgregar = document.querySelectorAll(".agregar");
botonesAgregar.forEach(boton => boton.addEventListener("click", agregarAlCarritoHandler));
mostrarCarritoButton.addEventListener("click", mostrarCarritoHandler);
document.getElementById("vaciarCarritoButton").addEventListener("click", vaciarCarritoHandler);
document.getElementById("mostrarTotalButton").addEventListener("click", mostrarTotal);


// Mostrar el carrito inicialmente
mostrarCarrito();
