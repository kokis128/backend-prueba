const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materiaSchema = new Schema({
    name: {
    type : String,
    required: true,
    maxlength: 20  
   
},
    curso: {
        type: String,
        
        maxlength: 10
       
      
    },

    division:{
        type: String,
        maxlength: 10  
       
    },

    
        dia: { type: String},
        horaInicio: { type: String},
        horaFin: { type: String},
     
        estudiantes:[{type: 
            mongoose.Schema.Types.ObjectId, ref: 'Estudiante' }], // Referencia a estudiantes
       
   
    observaciones:{
        type: String,
        maxlength: 100
    },
  

        createdAt:{
            type:Schema.Types.Date, required:true, default:Date.now
                    },
        updatedAt: {
            type: Schema.Types.Date
        },
        
        userId:{
            type:String,
            ref:'User'
        }

}
);
const Materia = mongoose.model('Materia',materiaSchema);

module.exports = Materia;







