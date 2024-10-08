const express = require('express');
const router = express.Router();
const Curso = require('../models/cursos');
const { findByIdAndDelete } = require('../models/clases');

router.post('/curso', async (req, res) => {
    try {
        const { curso, division, turno, objetivos } = req.body;
        console.log( curso, division, turno, objetivos);

        const newCurso = new Curso({
            curso,
            division,
            turno,
            objetivos
        });

        await newCurso.save();
        console.log(newCurso)
        res.status(201).json({ message: 'Curso creado correctamente', curso: newCurso });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/cursos', async (req, res) => {
    try {
        const cursos = await Curso.find({});
        res.json(cursos);
    } catch (err) {
        res.status(500);
    }
});

router.get('/curso', async (req, res) => {
    try {
        const itemPerPage = req.query.itemPerPage ? parseInt(req.query.itemPerPage) : 3;
        const itemsToSkip = req.query.page ? parseInt(req.query.page) * itemPerPage : 0;
        const searchParams = req.query.name ?
            { name: { '$regex': req.query.name, '$options': 'i' } } : {};

        const cursosDb = await Curso.find(searchParams)
                                    .limit(itemPerPage)
                                    .skip(itemsToSkip)
                                    .sort({ name: -1 });

        const totalCursos = await Curso.countDocuments(searchParams);
        
        res.json({
            cursos: cursosDb
            
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete('/curso/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        console.log(_id);

        const cursoEliminado = await Curso.findByIdAndDelete(_id);
        if (!cursoEliminado) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
       
        console.log(cursoEliminado)
        res.status(201).json({ message: 'Curso eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
