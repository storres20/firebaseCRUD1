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
