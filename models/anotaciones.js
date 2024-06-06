const mongoose = require('mongoose');

const AnotacionSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante', required: true },
  materia_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia', required: true },
  anotacion: {type:String},  
  registro:{type:String},
  fecha: { type: Date, default: Date.now, required: true }
});

const Anotacion = mongoose.model('Anotacion', AnotacionSchema);

module.exports = Anotacion;