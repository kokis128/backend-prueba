const express = require('express');
const router = express.Router();
const Clase = require('../models/clases');
const now = new Date();
const options = { timeZone: 'America/Argentina/Buenos_Aires' };
const horaArgentina = now.toLocaleTimeString('es-AR', options);


router.post('/clase', async (req, res) => {  
   
    try {        
        // Crear una nueva materia
        const newClase = new Clase(req.body);
        await newClase.save();
        res.status(201).json({ message: 'Clase creada correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/clases', async (req, res) => {
    try {
        const Clases = await Clase.find({}).populate('materiaId');
        res.json(Clases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/clase', async (req,res)=>{

try {
    
    
const itemPerPage=req.query.itemPerPage ? req.query.itemPerPage : 3 ;
const itemsToSkip = req.query.page * 2;
   
  const searchParams= req.query.tema ?
  
    
    {tema:
    {'$regex':req.query.tema,
     '$options':'i'}
    } :
    {}
   console.log(searchParams)
   const clasesDb=await Clase.find(searchParams)
                                    .limit(itemPerPage)
                                    .skip(itemsToSkip)
                                    .sort({name:-1})
                                    .populate('materiaId')

    const claseTotal = await Clase.countDocuments(searchParams)
   res.json(clases);
} catch (error) {
    res.send(error);
}


})

module.exports = router;