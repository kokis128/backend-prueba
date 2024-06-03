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
    anotaciones:{
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
claseSchema.methods.formatearFecha = function() {
    const formattedDate = this.fecha.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return formattedDate;
};

// Middleware para formatear la fecha antes de guardarla
claseSchema.pre('save', function(next) {
    this.fecha = this.formatearFecha(); // Llama al método formatearFecha
    next();
});



module.exports = mongoose.model('Clase', claseSchema);
