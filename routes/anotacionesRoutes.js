const express = require('express');
const router = express.Router();

const Materia = require('../models/materias');
const Anotacion = require('../models/anotaciones');
const mongoose = require('mongoose');
const now = new Date();
const options = { timeZone: 'America/Argentina/Buenos_Aires' };
const horaArgentina = now.toLocaleTimeString('es-AR', options);

router.post('/register_anotaciones', async (req, res) => {
  const { materia_id, anotaciones } = req.body;

  if (!materia_id || !Array.isArray(anotaciones)) {
    return res.status(400).json({ success: false, message: 'Datos de anotaciones incompletos o incorrectos' });
  }

  const anotacionesBd = anotaciones.map(({ student_id, anotacion }) => ({
    student_id,
    materia_id,
    anotacion
  }));

  try {
    await Anotacion.insertMany(anotacionesBd);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al registrar las anotaciones' });
  }
});
   

  router.get('/register_anotacion/:materia_id', async (req, res) => {
    const { materia_id } = req.params;
  
    try {
      // Obtener todos los estudiantes matriculados en la materia
      const materia = await Materia.findById(materia_id).populate('estudiantes');
      
      if (!materia) {
        return res.status(404).json({ success: false, message: 'Materia no encontrada' });
      }
  
     
      // Mapear los estudiantes matriculados con sus ausencias
      const anotaciones = materia.estudiantes.map(estudiante => {
        const anotacion = anotacion.find(a => a._id.toString() === estudiante._id.toString());
        
      });
  
      res.json({ success: true, data: anotaciones });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error al obtener las anotaciones' });
    }
  });
  module.exports = router;