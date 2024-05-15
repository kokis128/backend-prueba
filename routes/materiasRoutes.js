const express = require('express');
const router = express.Router();
const Materia = require('../models/materias');
const now = new Date();
const options = { timeZone: 'America/Argentina/Buenos_Aires' };
const horaArgentina = now.toLocaleTimeString('es-AR', options);


router.post('/materia', async (req, res) => {    
    try {
        const  { name,curso,division,dia,horaInicio,horaFin,observaciones,createdAt,userId } = req.body;
        
        const MateriEX=Materia.findOne( name);
        
        // Crear una nueva materia
        const newMateria = new Materia({ name,curso,division,dia,horaInicio,horaFin,observaciones,createdAt,userId });
        await newMateria.save();
        res.status(201).json({ message: 'Materia creada correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/materias', async (req, res) => {
    try {
        const materias = await Materia.find({}); 
                                       
        res.json(materias);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/materia', async (req,res)=>{

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
   const materiasDb=await Materia.find(searchParams)
                                    .limit(itemPerPage)
                                    .skip(itemsToSkip)
                                    .sort({name:-1})
                                    .populate('userId')

    const claseTotal = await Materia.countDocuments(searchParams)
   res.send({
    materia:materiasDb,
    total:claseTotal

   });
} catch (error) {
    res.send(error);
}


})




module.exports = router;