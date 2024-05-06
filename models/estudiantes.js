const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
        required:true
     },
        
    observaciones:{
        type: String,
        maxlength: 100
    },        
       
        
        materiaId:{
            type:String,
            ref:'Materias'
        }

}
);


module.exports = mongoose.model('Estudiante', estudianteSchema);