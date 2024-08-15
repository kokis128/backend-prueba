const express = require('express');
const router = express.Router();
const Area = require('../models/areas');
const now = new Date();
const options = { timeZone: 'America/Argentina/Buenos_Aires' };
const horaArgentina = now.toLocaleTimeString('es-AR', options);

router.post('/area', async (req, res) => {    
    try {
        const  { area,materias,informeDescripcion,cursoId } = req.body;
        console.log(req.body);
        const MateriEX=Area.findOne(area);
        
        // Crear una nueva materia
        const newArea = new Area({ area,materias,informeDescripcion,cursoId });
        await newArea.save();
        res.status(201).json({ message: 'Area creada correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/areas', async (req, res) => {
    try {
        const areas = await Area.find({}).populate('cursoId');; 
                                       
        res.json(areas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/area', async (req,res)=>{

try {
    
    
   const itemPerPage=req.query.itemPerPage ? req.query.itemPerPage : 3 ;
    const itemsToSkip = req.query.page * 2;
   
  const searchParams= req.query.area ?
  
    
    {area:
    {'$regex':req.query.name,
     '$options':'i'}
    } :
    {}
   console.log(searchParams)
   const areasDb=await Area.find(searchParams)
                                    .limit(itemPerPage)
                                    .skip(itemsToSkip)
                                    .sort({area:-1})
                                    .populate('userId')

    const claseTotal = await Materia.countDocuments(searchParams)
   res.send({
    materia:areasDb,
    total:areasTotal

   });
} catch (error) {
    res.send(error);
}
})

module.exports = router;