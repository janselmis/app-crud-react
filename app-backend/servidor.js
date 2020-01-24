const express = require('express');
const bodyParser = require('body-parser');

//TODO: Importar y usar modulo de middle-ware CORS
const cors = require ('cors');
const mongoose = require('mongoose');
const Usuario = require('./modelo')

const app = express();                          //MINUSCULA porque solo las clases empiezan con mayuscula, esto es una variable.

const PORT = 4000;                              //Las constantes de verdad se suelen escribir en MAYUSCULA.

//Software intermediario para la serializacion y 
//deserializacion (PARSEO) automatica.

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/db_usuarios');
const conexion = mongoose.connection;

conexion.once("open", function() {
    console.log(" 1) -¡Eureka hemos conectado!");
});


app.listen(
    PORT,
    function(){
        console.log("Servidor ejecutandose en " + PORT);
    });
    
const rutasAPI = express.Router();
//Y este obj va a hcaer de intermediario en el URL /api/usuarios.
app.use("/api/usuarios", rutasAPI);

//http://127.0.0.1:4000/api/usuarios/registro      metodo POST

function recibirRegistroPost(peticionHttp,respuestaHttp) {                             //(req) PETICION (res) respuesta
//Deberiamos recibir con JSON con el nuevo usuario
//Asi que creamos un obejeto SCHEMA y le pasamos el JASON ya
//convertido en el objeto de JS, gracias al BODY-PARSER

    let nuevoUsuario = new Usuario(peticionHttp.body);
    let promesaDeGuardado = nuevoUsuario.save()
    promesaDeGuardado.then(usuario => {
        console.log(" 2) - Se ha guardado en BBDD");
        respuestaHttp.status(200).json({
            "usuario": "Creado safisfactoriamente"
        })
    });
    promesaDeGuardado.catch( error => {
        console.log("4) - El registro ha fallado");
        respuestaHttp.status(400).send("El registro ha fallado");
    });
         console.log(" 3) - La peticion HTTP ha sido procesada");
}

rutasAPI.route("/registro").post(recibirRegistroPost);

rutasAPI.route("/").get(function(reqPeticionHttp, resRespuestaHttp) {
    //Pide toda la collecion e invoca a esta CALLBACK con ella y el error.
    Usuario.find( function(err,coleccioUsuarios) {
        if(err) {
            console.log(err)
        } else {
            //Pedimos devolver la coleccion en el formato JSON.
            //Invoca la Query en (MONGO)  DB.USUARIOS.FIND()
            resRespuestaHttp.json(coleccioUsuarios);
        
        }
    });

});
