const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-Productos');
let artCart = [];

cargarEventListeners();
function cargarEventListeners(){
    listaProductos.addEventListener('click', addProd);
    
    carrito.addEventListener('click',removeProd);

    //Reiniciar carrito desde 0
    vaciarCarrito.addEventListener('click',() => {
        artCart = [];
        limpiarHTML(); //Eliminamos todo el HTML del carrito con la funcion creada anteriormente
    })

};


//Functions
function addProd(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const prodSelect = e.target.parentElement.parentElement;
        leerDatosProds(prodSelect);
    
    }
};
function removeProd(e){
    if(e.target.classList.contains('borrar-curso')){
        const prodId = e.target.getAttribute('data-id');

        artCart = artCart.filter(prods => prods.id !== prodId);
        carritoHTML();

    }

}

function leerDatosProds(prods){
    const infoProds = {
        imagen: prods.querySelector('img').src,
        titulo: prods.querySelector('h5').textContent,
        precio: prods.querySelector('span').textContent,
        id: prods.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = artCart.some(prods => prods.id === infoProds.id);
        if(existe){
            const prod = artCart.map(prods =>{
                if(prods.id === infoProds.id){
                    prods.cantidad++;
                    return prods; // RETORNA EL OBJETO ACTUALIZADO
                }else{
                    return prods;// RETORNA LOS OBJETOS NO DUPLICADOS
                }
            })
        }else{
            artCart = [...artCart, infoProds];
            console.log(artCart);
        }
        
    carritoHTML();  

}

function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML();
    //Recorre el carrito y genera el HTML
    artCart.forEach( prods => {
        const row = document.createElement('tr');
        const { imagen, titulo, precio, cantidad, id } = prods;
        row.innerHTML = `
            <td>
                <img src='${imagen}' width='100'>
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'> X </a>
            </td>
        `;
        //Agregar el HTML del carrito al tbody
        contenedorCarrito.appendChild(row);

    })
};
function limpiarHTML(){
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
};