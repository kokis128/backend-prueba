const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materiaPorCursoSchema = new Schema({
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
    turno:{
        type: String,
        maxlength: 1 
       
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
         
    cursoId:{
            type:String,
            ref:'Curso'
        }
    }
);
const MateriaPorCurso = mongoose.model('MateriaPorCurso',materiaPorCursoSchema);

module.exports = MateriaPorCurso;
