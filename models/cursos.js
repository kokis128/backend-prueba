const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    curso: {
    type : String,
    required: true,
    maxlength: 1
   
},  
    division:{
        type: String,
        maxlength: 1       
    },
    turno:{
        type: String,
        maxlength: 11 
       
    },          
   
    objetivos:{
        type: String,
        maxlength: 200
    },
         
    userId:{
            type:String,
            ref:'User'
        }
    }
);
const Curso = mongoose.model('Curso',cursoSchema);

module.exports = Curso;



