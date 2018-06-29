

		var tbody = document.getElementById("tbody");
  // Initialize Firebase
    
                var mod_nombre = document.getElementById("mod-nombre");
                var mod_apellido = document.getElementById("mod-apellido");
                var mod_sexo = document.getElementById("mod-sexo");
                var mod_edad = document.getElementById("mod-edad");
                var mod_dni = document.getElementById("mod-dni");  		
            
              // Initialize Firebase
   var config = {
    apiKey: "AIzaSyD3HFYHCbqgoke6a61H2_vSo4NBCdHum64",
    authDomain: "crudfirebase-5aa89.firebaseapp.com",
    databaseURL: "https://crudfirebase-5aa89.firebaseio.com",
    projectId: "crudfirebase-5aa89",
    storageBucket: "crudfirebase-5aa89.appspot.com",
    messagingSenderId: "26121797067"
  };
  firebase.initializeApp(config);

       var database = firebase.database();

      var dbRef = database.ref();

  		var refUsuario = dbRef.child('usuario'); 

  		var objUsuario=null;
  		

  		refUsuario.on('value',snap=> {	


        tbody.innerHTML='';

        let nombre = new Array();
        let apellido = new Array();
        let edad = new Array();
        let sexo = new Array();
        let dni = new Array();

  			objUsuario = snap.val();

  			Object.entries(objUsuario).forEach( ([key,value]) => {

          nombre.push(value.nombre);
          apellido.push(value.apellido);
          sexo.push(value.sexo);
          edad.push(value.edad);
          dni.push(value.dni);  

        } );
        
          

          for (var i = 0; i <nombre.length; i++) {
                        
            var fila = document.createElement("tr"); //Creamos una fila

            var contenido = document.createTextNode(nombre[i]);   //Creamos un contenido 
            var contenido2 = document.createTextNode(apellido[i]);
            var contenido3 = document.createTextNode(sexo[i]);
            var contenido4 = document.createTextNode(edad[i]);
            var contenido5 = document.createTextNode(dni[i]);

            var boton= document.createElement("button");

            boton.setAttribute('class','btn btn-success boton-probar');
            boton.setAttribute('value',dni[i]);
            boton.setAttribute('data-toggle',"modal");
            boton.setAttribute('data-target',"#modalModificar");  // Le pasamos el valor del dnu del arreglo al boton modificar

            var nombreBoton= document.createTextNode("Editar");

            var columna = document.createElement("td");  //creamos una columna 
            var columna2 = document.createElement("td");
            var columna3 = document.createElement("td");
            var columna4 = document.createElement("td");
            var columna5 = document.createElement("td");
            var columna6 = document.createElement("td");



            boton.appendChild(nombreBoton);  //INgresamos nombre contenido al boton


            columna.appendChild(contenido);    //Ingresamos el contenido en cada columna(<td>)
            columna2.appendChild(contenido2);
            columna3.appendChild(contenido3);
            columna4.appendChild(contenido4);
            columna5.appendChild(contenido5);
            columna6.appendChild(boton);


            fila.appendChild(columna);          //Ingresamos las columnas unas por unas en la fila.(<tr>)
            fila.appendChild(columna2);
            fila.appendChild(columna3);
            fila.appendChild(columna4);
            fila.appendChild(columna5);
            fila.appendChild(columna6);


            tbody.appendChild(fila);
            

          }

          var boton_probar = document.querySelectorAll(".boton-probar");




          for (var t = 0; t < nombre.length; t++) {
            
            boton_probar[t].onclick = function(){


              refUsuario.child(this.value).on("value",snapshot => {

                console.log(this.value);
                console.log(snapshot.val());

                var objPersona = snapshot.val();


                mod_nombre.value=objPersona.nombre;
                mod_apellido.value=objPersona.apellido;
                mod_sexo.value=objPersona.sexo;
                mod_edad.value=objPersona.edad;
                mod_dni.value=objPersona.dni;

                

              });


              
            } 

          }

          


            
  		} );


      //GUARDAR FIREBASE


      var btnGuardar = document.getElementById('guardar');
      var id = "";
      var nombre = document.getElementById('nombre');
      var apellido = document.getElementById('apellido');
      var sexo = document.getElementById('sexo');
      var edad = document.getElementById('edad');
      var dni = document.getElementById('dni');

      btnGuardar.onclick = function(){

        var subNombre = nombre.value;
        var subApellido = apellido.value;

        id= subNombre+nombre.value+subApellido;
        
        var refId = refUsuario.child(dni.value);

        refId.set({
          nombre:nombre.value,
          apellido:apellido.value,
          sexo:sexo.value,
          edad:edad.value,
          dni:dni.value
        }
          );


        nombre.value='';
        apellido.value='';
        sexo.value='';
        edad.value='';
        dni.value='';

      }






      //ELIMINAR FIREBASE


      var eliminar = document.getElementById("eliminar-modal-delete");

      var dni_input_delete = document.getElementById("dni-delete");

      eliminar.onclick = function(){

        var refId = refUsuario.child(dni_input_delete.value);

        refId.remove();



      }


      //MODIFICAR FIREBASE

      var modificar = document.getElementById("modal-modificar");

      

      modificar.onclick = () => {
        
        var refIdPersona = refUsuario.child(mod_dni.value);

          refIdPersona.set({

          nombre: mod_nombre.value,
          apellido: mod_apellido.value,
          sexo:mod_sexo.value,
          edad: mod_edad.value,
          dni:mod_dni.value
        });

      }

