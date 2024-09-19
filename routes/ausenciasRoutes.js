const express = require('express');
const router = express.Router();
const Ausencia = require('../models/ausencias');
const Materia = require('../models/materias');
const Estudiante = require('../models/estudiantes');
const mongoose = require('mongoose');
const now = new Date();
const options = { timeZone: 'America/Argentina/Buenos_Aires' };
const horaArgentina = now.toLocaleTimeString('es-AR', options);

router.post('/register_absences', async (req, res) => {
    const { ausentes, materia_id, fecha } = req.body;
    if (!Array.isArray(ausentes) ) {
      return res.status(400).json({ success: false, message: 'Datos de ausencias incompletos' });
    }
  
    const ausencias = ausentes.map(id => ({ student_id: id, materia_id: materia_id, fecha:fecha}));
  
    try {
      await Ausencia.insertMany(ausencias);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error al registrar ausencias' });
    }
  });

  router.get('/count_absences/:materia_id', async (req, res) => {
    const { materia_id } = req.params;
  
    try {
      // Obtener todos los estudiantes matriculados en la materia
      const materia = await Materia.findById(materia_id).populate('estudiantes');
      
      if (!materia) {
        return res.status(404).json({ success: false, message: 'Materia no encontrada' });
      }
  
      // Contar las ausencias por estudiante en la materia seleccionada
      const ausencias = await Ausencia.aggregate([
        { $match: { materia_id: new mongoose.Types.ObjectId(materia_id) } },
        { $group: { _id: "$student_id", count: { $sum: 1 } } }
      ]);
  
      // Mapear los estudiantes matriculados con sus ausencias
      const resultado = materia.estudiantes.map(estudiante => {
        const ausencia = ausencias.find(a => a._id.toString() === estudiante._id.toString());
        return {
          estudiante: estudiante,
          ausencias: ausencia ? ausencia.count : 0
        };
      });
  
      res.json({ success: true, data: resultado });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error al contar ausencias' });
    }
  });

  router.get('/count_absences/:materia_id', async (req, res) => {
    const { materia_id } = req.params;
  
    try {
      // Obtener todos los estudiantes matriculados en la materia
      const materia = await Materia.findById(materia_id).populate('estudiantes');
      
      if (!materia) {
        return res.status(404).json({ success: false, message: 'Materia no encontrada' });
      }
  
      // Contar las ausencias por estudiante en la materia seleccionada
      const ausencias = await Ausencia.aggregate([
        { $match: { materia_id: new mongoose.Types.ObjectId(materia_id) } },
        { $group: { _id: "$student_id", count: { $sum: 1 } } }
      ]);
  
      // Mapear los estudiantes matriculados con sus ausencias
      const resultado = materia.estudiantes.map(estudiante => {
        const ausencia = ausencias.find(a => a._id.toString() === estudiante._id.toString());
        return {
          estudiante: estudiante,
          ausencias: ausencia ? ausencia.count : 0
        };
      });
  
      res.json({ success: true, data: resultado });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error al contar ausencias' });
    }
  });

  router.get('/ausentes', async (req, res) => {   
  
    try {
      // Obtener todos los estudiantes matriculados en la materia
      const ausentes = await Ausencia.find({});
      console.log(ausentes);
      
      if (!ausentes) {
        return res.status(404).json({ success: false, message: 'Ausencias no encontradas' });
      }
      return res.status(200).json({ausentes})
    }
    catch{
       res.status(404).json({success:false, messge: 'hubo un error al obtener las Ausencias'})
    }
  });


  





  module.exports = router;