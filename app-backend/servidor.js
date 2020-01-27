const Usuario = require('./modelo');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;  // Constantes de verdad se ponen
                    // siempre con mayusculas

// Software intermediario para la serializacion y
// deserializacion (parseo) automatica
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/db_usuarios');
const conexion = mongoose.connection;

conexion.once("open",function(){
    console.log("0) - Eureka hemos conectado en Mongoose");
});

app.listen(PORT, 
    function(){
        console.log("1) - Servidor ejecutandose en " + PORT);
    });

const rutasAPI = express.Router();
// Y este obj va a hacer de intermediario en url /api/usuarios
app.use("/api/usuarios",rutasAPI);
// http://localhost:4000/api/usuarios/registro metodo POST

function recibirRegistroPost(peticionHttp,respuestaHttp){
    console.log("2) - La peticion Http empieza ha ser procesada");
    // Deberiamos recibir un JSON con el nuevo usuario
    // Asi que creamos un objeto Schema y le pasamos el JSON ya
    // convertido en objeto JS gracias al body-parser
    let nuevoUsuario = new Usuario( peticionHttp.body );
    let promesaDeGuardado = nuevoUsuario.save();
    promesaDeGuardado.then( (usuario)=> {
        console.log("4) - Se ha registrado en bbdd");
        respuestaHttp.status(200).json({
            "usuario": "Creado satisfactoriamente"
        });
    }).catch( error => {
        console.log("4) - El registro ha fallado");
        respuestaHttp.status(400).send("El registro ha fallado");
    });
    console.log("3) - La peticion Http ha sido procesada");
}

rutasAPI.route("/registro").post(recibirRegistroPost);

rutasAPI.route("/").get(function(reqPeticionHttp, resRespuestaHttp){
    // Pide toooda la coleccion e invoca a esta callback con ella y el error
    // Invoca a la query de Mongo db.usuarios.find8() 
    Usuario.find(function(err, coleccionUsuarios){
        if(err){
            console.log(err);
        }else{
            // Pedimos devolver la coleccion en formato JSON
            resRespuestaHttp.json(coleccionUsuarios);
        }
    });
});

//DELETE: Delete usuarios
rutasAPI.route("/:id").delete(function(req,res){
    Usuario.findById(req.params.id).remove().exec();

    //OTRA FORMA
    // let consultaFindOne = Usuario.findById(req.params.id);
    // consultaFindOne.exec((err,resDoc)=>{
    //     if(err){
    //         res.json({"mensaje":"No se ha encontrado"});
    //     }else{
    //         console.log("Usuario encontrado", resDoc);
    //         consultaFindOne.deleteOne().exec(
    //             (err,resDoc2)=>{
    //                 let msjResp = "";
    //                 if(resDoc2.deletedCount>=1){
    //                     msjResp = "ELIMINADO";
    //                 }else{
    //                     msjResp = "NO eliminado";
    //                 }
    //                 console.log(resDoc2);
    //                 res.json({"mensaje":msjResp});
    //             }
    //         )
    //     }
    // })
});

//UPDATE: Modificar usuario, ESTO FUNCIONA
rutasAPI.route("/edit/:id").put(function(req,res){
    let editUsu = new Usuario(req.body);
    editUsu._id = req.params.id;
    Usuario.findById(editUsu._id, function(err,user){
        for(const prop in req.body){
            user[prop] = req.body[prop];
        }
        user.save();
    }).then(res=>res).catch(err=>err);
});

//GET UNIQUE USER: ESTO VA A FUNCIONAR
rutasAPI.route("/getUser/:id").get(function(req,res){
    const id = req.params.id;
    console.log('id', id);
    Usuario.findById(id)
        .then(response=>res.status(200).send(response))
        .catch(err=>err);
});