const preguntaContainer = document.getElementById("pregunta");
let username = document.getElementById("username");
const categoryPage = document.getElementById("category-page");


document.getElementById("btn-continue").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe y que se reinicie la página
    var name = document.getElementById("name").value;
    
    if (name !== "") {
        document.getElementById("welcome-form").style.display = "none";
        username.innerHTML = `<h4>${name}, elije una categoría </h4>`;
        categoryPage.style.display = "block";
    } else {
        alert("Por favor, ingresa tu nombre para continuar");
    }
});



fetch("trivia.json")
    .then(response => response.json()) 
    .then(data => {
        assignEventListeners(data);
    });



function assignEventListeners(data) {
    const categorias = ["geografia", "arte-y-literatura", "historia", "entretenimiento", "ciencias-y-naturaleza"];
    categorias.forEach(categoria => {
        const elemento = document.getElementById(categoria);
        elemento.addEventListener("click", function() {
            categoryPage.style.display = "none";
            const categoryContent = data.categorias.find(cat => cat.id === categoria);
            const preguntas = categoryContent.preguntas;
            const nombre = categoryContent.nombre;
            const categorias = data.categorias;
            manejarClickCategoria(categoria, preguntas, nombre);
        });
    });
}



// Este objeto almacena el estado del contador y la pregunta actual para cada categoría.
const estadoCategorias = {
    "geografia": { contador: -1},
    "arte-y-literatura": { contador: -1},
    "historia": { contador: -1},
    "entretenimiento": { contador: -1},
    "ciencias-y-naturaleza": { contador: -1}
};



function manejarClickCategoria(categoria, preguntas, nombre) {
    estadoCategorias[categoria].contador++; // Incrementar el contador de la categoría
    let cont = estadoCategorias[categoria].contador;

    if (cont > 9) {
        alert("Felicidades! Ya respondiste todas las preguntas de esta categoría, a partir de este momento se comenzarán a repetir")
        cont = 0;
    } 
    
    let respuestaCorrecta = preguntas[cont].respuesta_correcta;
    let pregunta1 = preguntas[cont].opciones[0];
    let pregunta2 = preguntas[cont].opciones[1];
    let pregunta3 = preguntas[cont].opciones[2];
    let pregunta4 = preguntas[cont].opciones[3];
    preguntaContainer.innerHTML = `<h4>Categoría ${nombre}</h4> 
                                                     <h2>${preguntas[cont].pregunta}</h2> 
                                                     <button onclick="respuesta('${pregunta1}', '${respuestaCorrecta}')">${pregunta1}</button> 
                                                     <button onclick="respuesta('${pregunta2}', '${respuestaCorrecta}')">${pregunta2}</button> 
                                                     <button onclick="respuesta('${pregunta3}', '${respuestaCorrecta}')">${pregunta3}</button> 
                                                     <button onclick="respuesta('${pregunta4}', '${respuestaCorrecta}')">${pregunta4}</button>`                                                                     
}



function respuesta(opcion_seleccionada, respuestaCorrecta) {
    if (respuestaCorrecta == opcion_seleccionada) {
        alert("Respuesta correcta!");
    } else {
        alert("Respuesta incorrecta!");
    }
    preguntaContainer.innerHTML = "";
    categoryPage.style.display = "block";
}