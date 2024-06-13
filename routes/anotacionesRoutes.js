const express = require('express');
const router = express.Router();
const { format, parseISO } = require('date-fns');
const { formatInTimeZone, toDate } = require('date-fns-tz');

const Materia = require('../models/materias');
const Clase = require('../models/clases');
const Anotacion = require('../models/anotaciones');

const timeZone = 'America/Argentina/Buenos_Aires';

// Helper function to format date in Argentina timezone
const formatDateInArgentina = (fecha) => {
  if (!fecha) {
    return null;
  }
  try {
    const date = addDays(parseISO(fecha), 1);
    return formatInTimeZone(date, timeZone, 'yyyy-MM-dd' , { locale: es });
  } catch (error) {
    console.error('Error al formatear la fecha:', error);
    return null;
  }
};

router.post('/register_anotaciones', async (req, res) => {
  const { materia_id, anotaciones, fecha } = req.body;
  console.log(fecha);
  if (!materia_id || !Array.isArray(anotaciones)) {
    return res.status(400).json({ success: false, message: 'Datos de anotaciones incompletos o incorrectos' });
  }
  
  const formattedFecha = fecha ? formatDateInArgentina(fecha) : null;
  console.log('Fecha formateada:', formattedFecha);

  const anotacionesBd = anotaciones.map(({ student_id, anotacion }) => ({
    fecha: formattedFecha,
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
    const clase = await Clase.materiaId.findById(materia_id).populate('materias');
    
    if (!clase) {
      return res.status(404).json({ success: false, message: 'clase no encontrada' });
    }
    
    // Mapear los estudiantes matriculados con sus ausencias
    const anotaciones = clase.materiaId.estudiantes.map(estudiante => {
      const anotacion = [...anotacion.find(a => a.student_id.toString() === estudiante._id.toString()), clase.materiaId.registro];
      console.log(anotaciones);
    });
    
    res.json({ success: true, data: anotaciones });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al obtener las anotaciones' });
  }
});

module.exports = router;
