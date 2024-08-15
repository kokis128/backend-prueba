const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const areaSchema = new Schema({
    area: {
    type : String,
    required: true,
    maxlength: 100  
},
    materias: {
         type: String,        
        maxlength: 100     
    },

    informeDescripcion: {
        type: String,        
        maxlength: 100     
    },

   

    
    cursoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Curso'
    },
  
    
    }
);
const Area = mongoose.model('Area',areaSchema);

module.exports = Area;
