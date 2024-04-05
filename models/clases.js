const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const claseSchema = new mongoose.Schema({

    tema: {
    type : String,   
   
},
    numero: {
        type: Number,
            
      
    },

    fecha:{
        type:Schema.Types.Date, required:true, default:Date.now
                },

    asistencia:{
        type:String,
        maxlength:10
    },

   
    observaciones:{
        type: String,
        maxlength: 100
    },        
        uptateAt: {
            type: Schema.Types.Date
        },
        
        materiaId:{
            type:String,
            ref:'Materia'
        }

}
);


module.exports = mongoose.model('Clase', claseSchema);
