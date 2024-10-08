const express = require('express');
const router = express.Router();

const now = new Date();
const options = { timeZone: 'America/Argentina/Buenos_Aires' };
const horaArgentina = now.toLocaleTimeString('es-AR', options);
const Clase = require('../models/clases');
const Anotacion = require('../models/anotaciones');

const Ausencia = require('../models/ausencias');


router.post('/clase', async (req, res) => {  
   
    try {        
        // Crear una nueva clase
        const newClase = new Clase(req.body);
        await newClase.save();
        res.status(201).json( newClase );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/clase/:id', async (req, res) => {
    try {
        const claseId = req.params.id;
        const updatedData = req.body;

        // Actualizar la clase existente con los nuevos datos
        const updatedClase = await Clase.findByIdAndUpdate(claseId, updatedData, { new: true, runValidators: true });

        if (!updatedClase) {
            return res.status(404).json({ message: 'Clase no encontrada' });
        }

        res.status(200).json({ message: 'Clase actualizada correctamente', data: updatedClase });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/clase/:id', async (req, res) => {
    try {
        const claseId = req.params.id;
        await Anotacion.deleteMany({ clase_id: claseId });
        await Ausencia.deleteMany({ clase_id: claseId });

        // Actualizar la clase existente con los nuevos datos
        const deletedClase = await Clase.findByIdAndDelete(claseId);
        
       

        if (deletedClase) {
            return res.status(200).json({message:'Clase Borrada correctamente'});
    }else{
        return res.status(404).json({message:'clase no encontrada'});
    }
    }catch (error){
    console.error(error);
    return res.status(500).json({message:'Error al borrar la materia'});
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
   res.json(clasesDb);
} catch (error) {
    res.send(error);
}


})

module.exports = router;