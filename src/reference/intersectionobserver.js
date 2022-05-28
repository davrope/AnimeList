const isIntersecting = (entry)=>{
    return entry.isIntersecting 
}

const action = ()=>{
    // para cargar solo haciendo scroll hacia abajo se tiene que desconectar el observador
    const nodo = entry.target
    observer.unobserve(nodo)
}
const observer = new IntersectionObserver((entries)=>{
    entries
        .filter(isIntersecting)
        .forEach(action)
})

export const registerImage = (image)=>{
    // IntersectionObserver=> observar imagen que estamos creando

    observer.observe(image)
}

// The registerImage function is used in the addImage component at index file

const addImage = ()=>{
    // las cosas dentro de esta función que no estén definidas se encuentran en el repositorio
    // del curso de manipulación de DOM de platzi
    const newImage = createImageNode();
    mountNode.append(newImage)
    registerImage(newImage)
};

addButton.addEventListener("click", addImage)

// Para agregar lazy loading en imagenes:
{/* <img src="imagen.png" loading= "lazy"/> */}