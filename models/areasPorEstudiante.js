const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const areaEstudianteSchema = new Schema({
   

    informe: {
        type: String,        
        maxlength: 200    
    },   

    nota: {
        type: Number,        
        maxlength: 10     
    },

    firma:{
        type:String,
        maxlength:10
    },

    areaId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Area'
    },
    estudianteId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante', required: true
     },
    
    }
);
const AreaEstudiante = mongoose.model('AreasPorEstudiante',areaEstudianteSchema);

module.exports = AreaEstudiante;


