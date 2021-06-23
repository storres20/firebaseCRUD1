//*Inicializamos Cloud Firestore
var db = firebase.firestore();
//*Inicializamos Cloud Firestore

//?2*****************************************

//*Agregar el Usuario, cada vez que se da CLICK al boton GUARDAR
function guardar(){
    //Capturamos el valor de los elementos que tienen ID nombre, apellido y fecha; en otras palabras, capturamos los valores de los INPUT TEXT y lo asignamos a las variables nombre, apellido, fecha
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;

    //Agregamos IF-ELSE. IF para que ejecute el codigo si todos los Input text estan llenos. ELSE para mostrar mensaje 
    if ((nombre !== "") && (apellido !== "") && (fecha !== "")) {

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

            //Mensaje de EXITO por el llenado de los datos
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha grabado con EXITO',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

    } else {
        //Mensaje ERROR en caso existan Datos incompletos
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'Falta llenar DATOS',
            showConfirmButton: false,
            timer: 1500
          })

    }

}
//*Agregar el Usuario, cada vez que se da CLICK al boton GUARDAR

//?2*****************************************

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
    var i=1; //inicializamos i, para mostrar en Tabla numeros correlativos
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`); //Los Backticks nos permite concatenar las variables ${} dentro de los parentesis del Console.log
        tabla.innerHTML += `<tr>
        <th scope="row">${i++}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
      </tr>`
      //Nota btn ELIMINAR: 1. se agrega onclick para que accione la funcion eliminar al recibir un click. 2. se coloca entre '' la variable ${doc.id}, para que este valor unico de cada item viaje a la funcion eliminar al recibir el click
      //!Nota btn EDITAR: similar al btn ELIMINAR; sin embargo, aprovechamos el boton editar para enviar los valores del id, nombre (first), apellido(last) y fecha(born)
      //Nota: se cambia ${doc.id} por ${i++} para mostrar en tabla numeros correlativos en la columna ID
    });
});
//*Leer Datos, desde DB Firebase

//?2*****************************************

//*Borrar Datos, en la Tabla y en DB Firebase
//Nota: 1. se cambia "cities" por "users"; ya que USERS es el nombre de la COLECCION de datos en Firebase. 2. en donde dice "DC" ahi va un ID. Para este caso se pone -> id
/*Antes:
db.collection("cities").doc("DC").delete()...
Despues:
db.collection("users").doc("id").delete()...
*/
function eliminar(id){

    //Mensaje CONFIRMAR antes de Eliminar

    Swal.fire({
        title: 'Esta seguro de ELIMINAR?',
        text: "!!!!!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sì, eliminar',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

            //****************************************************
            db.collection("users").doc(id).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
            //****************************************************

            /*Swal.fire(
            'Eliminado!',
            'Su DATO fue eliminado!',
            'success'
          )*/
            //Mensaje final con TEMPORIZADOR
            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Eliminado!',
                showConfirmButton: false,
                timer: 1500
            })

        }
      })

}

//*Borrar Datos, en la Tabla y en DB Firebase

//?2*****************************************

//*Editar Datos, en la Tabla y en DB Firebase
//Nota: Adaptamos el codigo de ACTUALIZAR DATOS de Firebase al codigo de nuestra TABLA
/*Nota 1:
Antes:
capital: true
Despues:
    first: nombre,
    last: apellido,
    born: fecha
*/
//Nota 2: cambiamos "cities" por "users"


function editar(id,nombre,apellido,fecha){
    //Al presionar este boton EDITAR se quiere que los INPUT TEXTS se llenen con los datos del item a editar
    //A esta funcion traemos los valores de nombre, apellido y fecha del item a editar, aprovechando el llamado de la funcion
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;

    //Para cambiar el nombre del boton GUARDAR a EDITAR durante la Edicion del dato
    var boton = document.getElementById('boton');
    boton.innerHTML = `Editar`;

    let contbtn = 1; // indicador de que se ingreso a la 1ra parte

    //Una vez cambiado el nombre del boton se asigna una funcion si es que se da CLICK. Esta funcion enviara los datos modificados al Firebase

    boton.onclick = function(){

        if (contbtn == 0) {
            guardar();
        }
        else{
        var washingtonRef = db.collection("users").doc(id);

        // Set the "capital" field of the city 'DC'

        //Se actualiza las variables debido a que el USUARIO a modificado los valores originales
        var nombre2 = document.getElementById('nombre').value;
        var apellido2 = document.getElementById('apellido').value;
        var fecha2 = document.getElementById('fecha').value;

        contbtn = 0; // ya que el btn toma el nombre GUARDAR, se indica a contbtn=0 para que al presionar el boton se cargue la funcion GUARDAR

        if ((nombre==nombre2)&&(apellido==apellido2)&&(fecha==fecha2)) {

            console.log("NO SE MODIFICO NADA!");
            boton.innerHTML = `Guardar`;
            //Estas 03 lineas de codigo limpian los valores de los INPUT TEXTS luego de presionar el boton GUARDAR
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fecha').value = '';

        } else {

            //Se envia los valores modificados a FIREBASE
            return washingtonRef.update({
                first: nombre2,
                last: apellido2,
                born: fecha2
            })
            .then(() => {
                console.log("Document successfully updated!");
                boton.innerHTML = `Guardar`;
                //Estas 03 lineas de codigo limpian los valores de los INPUT TEXTS luego de presionar el boton GUARDAR
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('fecha').value = '';
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
        }
    };
};


//*Editar Datos, en la Tabla y en DB Firebase