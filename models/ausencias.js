const mongoose = require('mongoose');

const AusenciaSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante', required: true },
  materia_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Materia', required: true },
  fecha: { type: Date, default: Date.now, required: true }
});

const Ausencia = mongoose.model('Ausencia', AusenciaSchema);

module.exports = Ausencia;