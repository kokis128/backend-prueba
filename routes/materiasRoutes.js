const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Materia = require('../models/materias');

const now = new Date();
const options = { timeZone: 'America/Argentina/Buenos_Aires' };
const horaArgentina = now.toLocaleTimeString('es-AR', options);

const Clase = require('../models/clases');
const Anotacion = require('../models/anotaciones');

const Ausencia = require('../models/ausencias');




router.post('/materia', async (req, res) => {    
    try {
        const  { name,curso,division,turno,dia,horaInicio,horaFin,observaciones,createdAt,userId,cursoId } = req.body;
        
        const MateriEX=Materia.findOne(name);
        
        // Crear una nueva materia
        const newMateria = new Materia({ name,curso,division,turno,dia,horaInicio,horaFin,observaciones,createdAt,userId,cursoId });
        await newMateria.save();
        res.status(201).json(newMateria);
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
   
  const searchParams= req.query.name ?
  
    
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
router.delete('/materia/:id', async(req,res)=>{
try{
    const {id}=  req.params;
    console.log('id', id);
   

    // Verificar si el ID es válido para MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

     // Buscar y eliminar todas las clases asociadas a la materia
     await Clase.deleteMany({ materiaId: id });
     await Anotacion.deleteMany({ materia_id: id });
     await Ausencia.deleteMany({ materia_id: id });

    const materia = await Materia.findByIdAndDelete(id);
    if (materia) {
        return res.status(200).json({message:'Materia Borrada correctamente'});
}else{
    return res.status(404).json({message:'materia no encontrada'});
}
}catch (error){
console.error(error);
return res.status(500).json({message:'Error al borrar la materia'});
}
}
);





module.exports = router;