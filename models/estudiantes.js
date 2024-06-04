const mongoose = require('mongoose');



const estudianteSchema = new mongoose.Schema({
    apellido: {
    type : String,   
    required:true   
},
    nombre: {
        type: String,
        required:true      
    },

    dni:{
        type: String,        
        maxlength: 8,
     },
        
    observaciones:{
        type: String,       
    },

    materiaId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Materia'
    }

}
);

module.exports = mongoose.model('Estudiante', estudianteSchema);