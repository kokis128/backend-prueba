const express = require('express');
const router = express.Router();
const Materia = require('../models/materias');
const Estudiante = require('../models/estudiantes');




router.post('/estudiante', async (req, res) => {    
    try {
        const  { nombre,apellido,dni,observaciones,materiaId } = req.body;
        
        // Crear un estudiante 
        const newEstudiante = new Estudiante({ nombre,apellido,dni,observaciones,materiaId});
        await newEstudiante.save();
        res.status(201).json({ message: 'Estudiante creado correctamente'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/estudiantes', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find({}); 
        res.json(estudiantes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/estudiante', async (req,res)=>{

try {
    
    
   const itemPerPage=req.query.itemPerPage ? req.query.itemPerPage : 3 ;
    const itemsToSkip = req.query.page * 2;
   
  const searchParams=await req.query.name ?
  
    
    {name:
    {'$regex':req.query.name,
     '$options':'i'}
    } :
    {}
   console.log(searchParams)
   const estudiantesDb=await Estudiante.find(searchParams)
                                    .limit(itemPerPage)
                                    .skip(itemsToSkip)
                                    .sort({nombre:-1})
                                    .populate('materiaId')

    const estudiantesTotal = await Estudiante.countDocuments(searchParams)
   res.send({
    materia:estudiantesDb,
    total:estudiantesTotal

   });
} catch (error) {
    res.send(error);
}


});


router.put('/estudiante/:id/matricular', async (req, res) => {    
    
        const estudianteId =req.params.id;
        const  {materiaId}  = req.body;
        
        console.log(materiaId)
        
        try{
        const estudiante = await Estudiante.findById(estudianteId);
        if(!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado'});
        }
        const materia = await Materia.findById(materiaId);
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        const isMatriculado = materia.estudiantes.includes(estudianteId);
        console.log(isMatriculado)
        if (isMatriculado) {
            console.log('El estudiante ya esta matriculado');
            return res.status(404).json('El estudiante ya esta matriculado');
        }
        console.log(isMatriculado)

         materia.estudiantes.push(estudianteId);
        await materia.save();
        console.log(materia.estudiantes)
        res.status(200).json({ message: 'Estudiante matriculado correctamente' });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;