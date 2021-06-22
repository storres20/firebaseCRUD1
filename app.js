var db = firebase.firestore();


//*Agregar el Usuario, cada vez que se da CLICK al boton GUARDAR
function guardar(){
    //Capturamos el valor de los elementos que tienen ID nombre, apellido y fecha; en otras palabras, capturamos los valores de los INPUT TEXT y lo asignamos a las variables nombre, apellido, fecha
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;

    db.collection("users").add({
        first: nombre, //var nombre = document...
        last: apellido, //var apellido = document...
        born: fecha //var fecha = document...
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        //Estas 03 lineas de codigo limpian los valores de los INPUT TEXTS luego de presionar el boton GUARDAR
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('fecha').value = '';
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}
//*Agregar el Usuario, cada vez que se da CLICK al boton GUARDAR

//*****************************************

//*Leer Datos, desde DB Firebase
//Nota: "tabla" es el ID de <tbody></tbody> en la tabla de Bootstrap del index.html. Se apunta a esta tabla con JS para llenarlo con los valores del Firebase
var tabla = document.getElementById('tabla');
//Nota: 1. La variable DOC nos trae todos los documentos de USERS (Toda la coleccion de Firebase)
//!Nota: 2. Reemplazamos get() por onSnapshot() para actualizaciones en Tiempo Real
/*Antes: 
db.collection("users").get().then((querySnapshot)...
Despues:
db.collection("users").onSnapshot((querySnapshot)...
*/
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`); //Los Backticks nos permite concatenar las variables ${} dentro de los parentesis del Console.log
        tabla.innerHTML += `<tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
      </tr>`
    });
});
//*Leer Datos, desde DB Firebase
