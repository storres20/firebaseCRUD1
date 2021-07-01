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



db.collection("user").onSnapshot((querySnapshot) => {

    dataSet = [];

    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`); //Los Backticks nos permite concatenar las variables ${} dentro de los parentesis del Console.log

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

            //limpiar los input text
            document.getElementById('nombre2').value = '';
            document.getElementById('apellido2').value = '';
            document.getElementById('fecha2').value = '';
            //limpiar los input text

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

                        //fecha2 = 2021-01-01 ... se debe hacer una conversion previa para mostrar 01/01/2021
                        dArr = [];
                        dArr = fecha2.split("-"); // input 2021-01-01
                        fecha2 = dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; // output 01/01/2021
                        //fecha2 = 2021-01-01 ... se debe hacer una conversion previa para mostrar 01/01/2021

                        //Agregamos IF-ELSE. IF para que ejecute el codigo si todos los Input text estan llenos. ELSE para mostrar mensaje
                        if ((nombre2 !== "") && (apellido2 !== "") && (fecha2 !== "")) {
                            db.collection("user").add({
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

                        //fecha3 = 2021-01-01 ... se debe hacer una conversion previa para mostrar 01/01/2021
                        dArr = [];
                        dArr = fecha3.split("-"); // input 2021-01-01
                        fecha3 = dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; // output 01/01/2021
                        //fecha3 = 2021-01-01 ... se debe hacer una conversion previa para mostrar 01/01/2021

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

                            var washingtonRef = db.collection("user").doc(data2[0]);

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

            //reconversion de fecha... de 01/01/2021 a 2021-01-01
            dArr = [];
            dArr = fecha2.split("/"); // input 2021-01-01
            fecha2 = dArr[2]+ "-" +dArr[1]+ "-" +dArr[0]; // output 01/01/2021
            //reconversion de fecha... de 01/01/2021 a 2021-01-01

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

            data2 = []; //array para estos datos (id,nombre,apellido,fecha)

            //*capturo los valores de la fila del DataTable - start
            fila = $(this).closest("tr");
            //ID = fila.find('td:eq(0)').text();
            var fila2 = tableId.row( fila ).data(); //contiene todos los datos incluido el OCULTO
            var id2 = fila2[0]; //valor de ID

            //*capturo los valores de la fila del DataTable - stop

            data2 = [id2];

            //?cuadro confirmacion - start
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
                    db.collection("user").doc(data2[0]).delete().then(() => {
                        console.log("Document successfully deleted!");
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                    //****************************************************

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

            //?cuadro confirmacion - end
        });

        //*btnBorrar - end

        //? ********************

        //*btn agregar grupo de DATOS a Firebase - start
        $("#btnAdd").click(function(){

            //Mensaje - start
            Swal.fire({
                //position: 'top-end',
                icon: 'success',
                title: 'Agregado #20 datos!',
                showConfirmButton: false,
                timer: 1500
            })
            //Mensaje - stop

            //unsubscribe();

            for (let i = 1; i <= 20; i++) {

            //Random de Fecha - start
            fechaArr = [];
            fechaArr[0] = Math.floor(Math.random() * 30) + 1; // 1->30 dia

            if (fechaArr[0]/10<1) {
                fechaArr[0] = "0"+fechaArr[0];
            }

            fechaArr[1] = Math.floor(Math.random() * 12) + 1; // 1->12 mes

            if (fechaArr[1]/10<1) {
                fechaArr[1] = "0"+fechaArr[1];
            }

            fechaArr[2] = Math.floor(Math.random() * 50) + 1970; // 1->2000 año

            var fecha4 = fechaArr[0] + "/" +fechaArr[1] + "/" + fechaArr[2]; // output 01/01/2021

            //alert(fecha4);
            //Random de Fecha - stop

            //Random de Nombre y Apellido - start
            var nombre4 = generateName();
            nameArr = [];
            nameArr = nombre4.split(" ");

            nombre4 = nameArr[0];
            apellido4 = nameArr[1];

            //alert(nombre4);
            //alert(apellido4);
            //Random de Nombre y Apellido - stop

            

            db.collection("user").add({
                first: nombre4, //var nombre = document...
                last: apellido4, //var apellido = document...
                born: fecha4 //var fecha = document...
            });
            
            }

            //subscribe();

            

        });


        //*btn agregar grupo de DATOS a Firebase - stop

    } );
    //?Llenado de la DataTable con datos - start
});
//*Leer Datos, desde DB Firebase - end

//?2*****************************************

//*Unsubscribe onSnapShot - start

/*let unsubscribe;

getRealtimeUpdates = function(document) {
		unsubscribe = firestore.collection("user")
			.onSnapshot(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				if (doc && doc.exists) {
					const myData = doc.data();
					// DO SOMETHING
				}
			});
		});
	}
  
  // unsubscribe: */


//*Unsubscribe onSnapShot - stop
