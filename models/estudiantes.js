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

    curso:{
        type: String,
     },

   

   
    observaciones:{
        type: String,
        maxlength: 100
    },        
       
        
        claseId:{
            type:String,
            ref:'Clases'
        }

}
);


module.exports = mongoose.model('Estudiante', estudianteSchema);