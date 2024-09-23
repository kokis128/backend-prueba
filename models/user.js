const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
       
    email: {
        type: String,
        required: true,
        unique: true, 
        validate: {
          validator: function(v) {
            // Expresión regular para validar el formato de un correo electrónico
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: props => `${props.value} no es un correo electrónico válido!`
        }
      },

    password: {
        type: String,
        required: true,
        maxlength: 8, // Máximo de 20 caracteres
    },

    nombre:{
        type: String,
        required: true,
        maxlength: 30,

    },
    apellido:{
        type: String,
        required: true,
        maxlength: 30,

    },
    funcion:{
        type: String,
        required: true,
        maxlength: 10,

    }
});

module.exports = mongoose.model('User', userSchema);