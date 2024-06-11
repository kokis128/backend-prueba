const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const claseSchema = new mongoose.Schema({

    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    hora: {
        type: Schema.Types.String,
        required: true,
        default: () => {
            const now = new Date();
            return now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
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
    registro:{
        type: String,
        maxlength: 150
    },
   
    observaciones:{
        type: String,
        maxlength: 150
    },        
        materiaId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Materia'
        }
       

}
);







const Clase = mongoose.model('Clase', claseSchema);
module.exports = Clase;
