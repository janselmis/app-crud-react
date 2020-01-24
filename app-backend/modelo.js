const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//TODO: Validaciones de campos BBDD.¡OBLIGATORIO!
let Usuario = new Schema( {
    Nombre:{
        type: String                        //Definiendo la clase por eso esta en MAYUSCULA la primera letra.
    },
    email:{
        type: String                        //Definiendo la clase por eso esta en MAYUSCULA la primera letra.
    },
    password:{
        type: String                        //Definiendo la clase por eso esta en MAYUSCULA la primera letra.
    }
});

//Como el export default pero para NODE.
module.exports = mongoose.model('Usuario', Usuario);
