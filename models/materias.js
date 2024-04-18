const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var dias=['lunes','martes','miercoles','jueves','viernes'];

const materiaSchema = new mongoose.Schema({

    name: {
    type : String,
    required: true,
    maxlength: 20  
   
},
    curso: {
        type: String,
        required:true,
        maxlength: 10
       
      
    },

    division:{
        type: String,
        required:true,
        maxlength: 10  
       
    },

    
        dia: { type: String, required: true},
        horaInicio: { type: String, required: true },
        horaFin: { type: String, required: true },
     
        estudiantes: [{ type: Schema.Types.ObjectId, ref: 'Estudiante' }], // Referencia a estudiantes
       
   
    observaciones:{
        type: String,
        maxlength: 100
    },
  

        createdAt:{
            type:Schema.Types.Date, required:true, default:Date.now
                    },
        uptateAt: {
            type: Schema.Types.Date
        },
        
        userId:{
            type:String,
            ref:'User'
        }

}
);


module.exports = mongoose.model('Materia', materiaSchema);







