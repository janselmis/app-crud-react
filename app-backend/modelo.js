const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: Validaciones de campos en BBDD. ¡OBLIGATORIO!
let Usuario = new Schema({
    nombre: {
        type: String
    },
    email: {
        type: String // String en mayus
    },
    edad:{
        type: Number
    },
    password:{
        type: String
    }
});

// Como el export default pero para Node...
module.exports = mongoose.model('Usuario',Usuario);