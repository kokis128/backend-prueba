const express = require('express');
const router = express.Router();
const Estudiante = require('../models/estudiantes');



router.post('/estudiante', async (req, res) => {    
    try {
        const  { nombre,apellido,curso } = req.body;
        
       
        
        // Crear un estudiante 
        const newEstudiante = new Estudiante({ nombre,apellido,curso});
        await newEstudiante.save();
        res.status(201).json({ message: 'Estudiante creada correctamente' });
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
                                    .populate('claseId')

    const estudiantesTotal = await Estudiante.countDocuments(searchParams)
   res.send({
    materia:estudiantesDb,
    total:estudiantesTotal

   });
} catch (error) {
    res.send(error);
}


})

module.exports = router;