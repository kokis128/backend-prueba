const express = require('express');
const router = express.Router();
const MateriaPorCurso = require('../models/materiasPorCurso');
const now = new Date();
const options = { timeZone: 'America/Argentina/Buenos_Aires' };
const horaArgentina = now.toLocaleTimeString('es-AR', options);


router.post('/materiaPorCurso', async (req, res) => {
    try {
        const  { name,curso,division,dia,horaInicio,horaFin,observaciones,createdAt,cursoId } = req.body;
        
        const MateriEX=Materia.findOne(name);
        
        // Crear una nueva materia
        const newMateria = new MateriaPorCurso({ name,curso,division,dia,horaInicio,horaFin,observaciones,createdAt,cursoId });
        await newMateria.save();
        res.status(201).json({ message: 'Materia creada correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/materiaPorCurso', async (req, res) => {
    try {
        const materias = await Materia.find({});                                       
        res.json(materias);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
