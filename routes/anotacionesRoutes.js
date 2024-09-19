const express = require('express');
const router = express.Router();
const { format, parseISO, addDays } = require('date-fns');
const { formatInTimeZone } = require('date-fns-tz');
const { es } = require('date-fns/locale'); 



const Anotacion = require('../models/anotaciones');

const timeZone = 'America/Argentina/Buenos_Aires';

// Helper function to format date in Argentina timezone
const formatDateInArgentina = (fecha) => {
  if (!fecha) {
    return null;
  }
  try {
    const date = (parseISO(fecha));
    return formatInTimeZone(date, timeZone, 'yyyy-MM-dd' , { locale: es });
  } catch (error) {
    console.error('Error al formatear la fecha:', error);
    return null;
  }
};

router.post('/register_anotaciones', async (req, res) => {
  const { materia_id, anotaciones, fecha } = req.body;
  console.log('Fecha recibida:', fecha);
 
  if (!materia_id || !Array.isArray(anotaciones)) {
    return res.status(400).json({ success: false, message: 'Datos de anotaciones incompletos o incorrectos' });
  }
  
  const formattedFecha = fecha ? formatDateInArgentina(fecha) : null;
  console.log('Fecha formateada:', formattedFecha);

  const anotacionesBd = anotaciones.map(({ student_id, anotacion }) => ({
    fecha:formattedFecha,
    student_id,
    materia_id,
    anotacion
  }));
  console.log('anotaciones agrgar',anotacionesBd);

  try {
    await Anotacion.insertMany(anotacionesBd);
    res.json(anotacionesBd);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al registrar las anotaciones' });
  }
});


router.put('/update_anotaciones/:_id', async (req, res) => {
  const { anotacion } = req.body;
  const { _id } = req.params; // Acceder al id de la URL
 
  console.log('id recibido:', _id);
 
  if (!_id || !anotacion) {
  
    return res.status(400).json({ success: false, message: 'Datos de anotaciones incompletos o incorrectos' });
  }
  console.log("anotacion recibida:",anotacion)
  
 
try{
  const anotacioUpdated =  await Anotacion.findByIdAndUpdate( _id, {anotacion:anotacion} , { new: true, runValidators: true });
  if (!anotacioUpdated) {
    
    return  res.status(400).json({ success: false, message: 'Datos de anotaciones incompletos o incorrectos' });

    
}
res.status(200).json({ message: 'Anotación actualizada correctamente', anotacion: anotacioUpdated });
console.log('anotacion para guardar',anotacioUpdated);
}
catch{
    // Manejo de errores
    console.error('Error al actualizar la anotación:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar la anotación' });
 
  }});














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
      const anotacion = anotaciones.find(a => a.student_id.toString() === estudiante._id.toString());
      return {
        student_id: estudiante._id,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        anotacion: anotacion ? anotacion.anotacion : null,
      };
    });




    
    res.json({ success: true, data: anotaciones });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error al obtener las anotaciones' });
  }
});

module.exports = router;
