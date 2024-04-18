const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const claseSchema = new mongoose.Schema({

    fecha:{
        type:Schema.Types.Date, required:true, default:Date.now
     },


    tema: {
    type : String,   
   
},
    numero: {
        type: Number,
            
      
    },

   

    asistencia:{
        type:String,
        maxlength:10
    },
    contenidos:{
        type: String,
        maxlength: 150
    },
    actividades:{
        type: String,
        maxlength: 150
    },
    anotaciones:{
        type: String,
        maxlength: 150
    },
   
    observaciones:{
        type: String,
        maxlength: 150
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
