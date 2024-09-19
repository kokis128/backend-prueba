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
        maxlength: 3     
    },
    division:{
        type: String,
        maxlength: 3       
    },
    turno:{
        type: String,
        maxlength: 10 
       
    },    
        dias: { type: String,
                maxlength: 20
        },

        horarios:{type:String,
                maxlength: 20
        },
        
     
    estudiantes:[{type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante'}], // Referencia a estudiantes
          
    observaciones:{
        type: String,
        maxlength: 100
    },
         
    userId:{
            type:String,
            ref:'User'
        },

    cursoId:{
            type:String,
            ref:'Curso'
        }

    }
);
const Materia = mongoose.model('Materia',materiaSchema);

module.exports = Materia;







