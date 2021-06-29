//*Inicializamos Cloud Firestore - start
var db = firebase.firestore();
//*Inicializamos Cloud Firestore - end

//?2*****************************************

//*Inicializamos DataTable - start

var filaEliminada; //!para capturara la fila eliminada
var filaEditada; //!para capturara la fila editada o actualizada

var dataSet = new Array();

//* creamos constantes para los iconos editar y borrar - start
const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
//* creamos constantes para los iconos editar y borrar - stop


//*Inicializamos DataTable - end

//?2*****************************************

//*Agregar el Usuario, cada vez que se da CLICK al boton GUARDAR - start
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
                position: 'top',
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
            position: 'top',
            icon: 'info',
            title: 'Falta llenar DATOS',
            showConfirmButton: false,
            timer: 1500
          })
    }
}
//*Agregar el Usuario, cada vez que se da CLICK al boton GUARDAR - end

//?2*****************************************

//*Leer Datos, desde DB Firebase - start
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
    
    dataSet = [];

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

        //?El codigo de arriba carga los datos provenientes del Firestore. El codigo de abajo guardar los datos en "dataSet"

        dataSet.push([
            doc.id, doc.data().first, doc.data().last, doc.data().born
        ]);

        //? end

    });

    //?Llenado de la DataTable con datos - start

    //*Lleno la DataTable
    $(document).ready( function () {

        //?para evitar error de REinicializacion de DataTable - start
        var tableObj = $('#table_id').DataTable();

        // clear first
        if(tableObj!=null){
        tableObj.clear();
        tableObj.destroy();
        }
        //?para evitar error de REinicializacion de DataTable - end

        tableId = $('#table_id').DataTable({
            //Se cambio lenguaje de Datatable a Spanish
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json"},

            pageLength : 5,
            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
            data: dataSet, //dataSet contiene los DATOS para llenar la Tabla

            columnDefs: [
                {
                    targets: [0],
                    visible: false, //ocultamos la columna de ID que es la [0]
                },
                {
                    targets: -1,
                    //defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>"+iconoEditar+"</button><button class='btn btn-danger' data-toggle='tooltip' title='Borrar' onclick='btnBorrar()'>"+iconoBorrar+"</button></div></div>"

                    defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-warning' data-toggle='tooltip' title='Editar'>"+iconoEditar+"</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>"+iconoBorrar+"</button></div></div>"
                }
            ]
        });

        let opcion;

        //*btnNuevo - DataTable - start
        //activa la ventana MODAL para ingresar NUEVOS DATOS
        $("#btnNuevo").click(function(){
            //$("#formMenu").trigger("reset"); //resetea los campos del formulario
            //alert("nuevo");
            $(".modal-header").css("background-color", "#0275d8");
            $(".modal-header").css("color","white");
            $(".modal-title").text("Menu - Nuevo");
            $("#modalCRUD").modal("show"); //activa el MODAL
            opcion = 1; //Nuevo
        });
        //*btnNuevo - DataTable - end

        //? ***************************

        //*formMenu - DataTable - start
        //Los valores de los INPUT TEXT los grabo en variables para enviarles al Firebase
        $("#formMenu").submit(function(e){
            e.preventDefault();

            switch (opcion) {
                case 1: var nombre2 = document.getElementById('nombre2').value;
                        var apellido2 = document.getElementById('apellido2').value;
                        var fecha2 = document.getElementById('fecha2').value;

                        //Agregamos IF-ELSE. IF para que ejecute el codigo si todos los Input text estan llenos. ELSE para mostrar mensaje
                        if ((nombre2 !== "") && (apellido2 !== "") && (fecha2 !== "")) {
                            db.collection("users").add({
                                first: nombre2, //var nombre = document...
                                last: apellido2, //var apellido = document...
                                born: fecha2 //var fecha = document...
                            });
                        }

                        document.getElementById('nombre2').value = '';
                        document.getElementById('apellido2').value = '';
                        document.getElementById('fecha2').value = '';

                        $("#modalCRUD").modal("hide"); //esconde el MODAL

                        //Mensaje de EXITO por el llenado de los datos - start
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se ha grabado con EXITO',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        //Mensaje de EXITO por el llenado de los datos - end
                        //return;
                        break;

                case 2:
                        let data3 = [];
                        var nombre3 = document.getElementById('nombre2').value;
                        var apellido3 = document.getElementById('apellido2').value;
                        var fecha3 = document.getElementById('fecha2').value;

                        data3 = [nombre3,apellido3,fecha3];

                        if ((data2[1]==nombre3)&&(data2[2]==apellido3)&&(data2[3]==fecha3)) {

                            //Estas 03 lineas de codigo limpian los valores de los INPUT TEXTS luego de presionar el boton GUARDAR
                            document.getElementById('nombre2').value = '';
                            document.getElementById('apellido2').value = '';
                            document.getElementById('fecha2').value = '';

                            $("#modalCRUD").modal("hide"); //esconde el MODAL

                            Swal.fire({
                                position: 'center',
                                icon: 'info',
                                title: 'No hubo cambios!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            break;
                        }

                        if ((nombre3 !== "")&&(apellido3 !== "")&&(fecha3 !== "")) {

                            var washingtonRef = db.collection("users").doc(data2[0]);

                            //Estas 03 lineas de codigo limpian los valores de los INPUT TEXTS luego de presionar el boton GUARDAR
                                document.getElementById('nombre2').value = '';
                                document.getElementById('apellido2').value = '';
                                document.getElementById('fecha2').value = '';

                                $("#modalCRUD").modal("hide"); //esconde el MODAL

                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Datos Actualizados!',
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                            //Se envia los valores modificados a FIREBASE
                            return washingtonRef.update({
                                first: data3[0], //nombre3
                                last: data3[1], //apellido3
                                born: data3[2] //fecha3
                            });

                        }

                        break;

                case 3: alert("btnBorrar");
                        break;
            
                default:
                    break;
            }

            
        });
        //*formMenu - DataTable - end

        //? ***************************

        //*btnCancel y btnX - start
        $("#btnCancel").click(function(){
            document.getElementById('nombre2').value = '';
            document.getElementById('apellido2').value = '';
            document.getElementById('fecha2').value = '';
            $("#modalCRUD").modal("hide"); //esconde el MODAL
        });

        $("#btnX").click(function(){
            document.getElementById('nombre2').value = '';
            document.getElementById('apellido2').value = '';
            document.getElementById('fecha2').value = '';
            $("#modalCRUD").modal("hide"); //esconde el MODAL
        });
        //*btnCancel y btnX - end

        //? ***************************

        //*btnEditar - start
        $(document).on("click",".btnEditar", function(){

            data2 = []; //array para estos datos (id,nombre,apellido,fecha)

            //*capturo los valores de la fila del DataTable - start
            fila = $(this).closest("tr");
            //ID = fila.find('td:eq(0)').text();
            var fila2 = tableId.row( fila ).data(); //contiene todos los datos incluido el OCULTO
            var id2 = fila2[0]; //valor de ID
            console.log(id2);

            var nombre2 = fila.find('td:eq(0)').text();
            var apellido2 = fila.find('td:eq(1)').text();
            var fecha2 = fila.find('td:eq(2)').text();
            //*capturo los valores de la fila del DataTable - stop

            data2 = [id2,nombre2,apellido2,fecha2];

            //*Muestro los valores capturados en el formulario Modal - start
            $("#nombre2").val(nombre2);
            $("#apellido2").val(apellido2);
            $("#fecha2").val(fecha2);
            //*Muestro los valores capturados en el formulario Modal - stop

            $(".modal-header").css("background-color", "#f0ad4e");
            $(".modal-header").css("color","white");
            $(".modal-title").text("Menu - Editar");
            $("#modalCRUD").modal("show"); //muestra el MODAL
            opcion = 2; //Editar

        });

        //*btnEditar - end

        //? ***************************

        //*btnBorrar - start
        $(document).on("click",".btnBorrar", function(){
            fila = $(this).closest("tr");
            //ID = fila.find('td:eq(0)').text();
            //id2 = tableId.row(this).data()[0];

            let nombre2 = fila.find('td:eq(0)').text();
            let apellido2 = fila.find('td:eq(1)').text();
            let fecha2 = fila.find('td:eq(2)').text();

            $("#nombre2").val(nombre2);
            $("#apellido2").val(apellido2);
            $("#fecha2").val(fecha2);

            $(".modal-header").css("background-color", "#d9534f");
            $(".modal-header").css("color","white");
            $(".modal-title").text("Menu - Borrar");
            $("#modalCRUD").modal("show"); //muestra el MODAL
            opcion = 3;
        });

        //*btnBorrar - end


    } );
    //?Llenado de la DataTable con datos - start
});
//*Leer Datos, desde DB Firebase - end

//?2*****************************************

//*Borrar Datos, en la Tabla y en DB Firebase - start
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

    //?Borrar Datos con DataTable - start

    //?Borrar Datos con DataTable - end

//*Borrar Datos, en la Tabla y en DB Firebase - end

//?2*****************************************

//*Editar Datos, en la Tabla y en DB Firebase - start
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

            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'No hubo cambios!',
                showConfirmButton: false,
                timer: 1500
            })

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

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Datos Actualizados!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
        }
    };
};


//*Editar Datos, en la Tabla y en DB Firebase - end