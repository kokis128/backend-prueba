const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
       
    email: {
        type: String,
        required: true,
        unique: true, 
       
      },

    password: {
        type: String,
        required: true,
        maxlength: 8, // Máximo de 8 caracteres
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

    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
   
});

module.exports = mongoose.model('User', userSchema);