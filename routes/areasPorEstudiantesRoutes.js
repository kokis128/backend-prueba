const express = require('express');
const router = express.Router();
const AreaEstudiante = require('../models/areasPorEstudiante');
const now = new Date();
const options = { timeZone: 'America/Argentina/Buenos_Aires' };
const horaArgentina = now.toLocaleTimeString('es-AR', options);

router.post('/areaEstudiante', async (req, res) => {   
    console.log(req.body); 
    try {
        const { informe, nota, firma, areaId, estudianteId } = req.body;

        // Verifica que todos los campos necesarios estén presentes
        if (!informe || !nota || !firma || !areaId || !estudianteId) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

       
        
        // Crear un nuevo documento de AreaEstudiante
        const newAreaEstudiante = new AreaEstudiante({ informe, nota, firma, areaId, estudianteId });
        
        // Guardar el documento en la base de datos
     
        const savedAreaEstudiante = await newAreaEstudiante.save();
        res.status(201).json(savedAreaEstudiante);
    } catch (err) {
        console.error('Error al crear la nota:', err); // Agrega más detalles del error
        res.status(500).json({ message: err.message });
    }
});
router.get('/areaEstudiante', async (req, res) => {
    try {
        const areaEstudiante = await AreaEstudiante.find({});
                                       
        res.json(areaEstudiante);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para actualizar un informe existente
// Ruta para actualizar un informe existente
router.put('/areaEstudiante/:id', (req, res) => {
    const { id } = req.params;
    const informeActualizado = req.body;
  
    console.log(`Actualizando informe con ID: ${id}`); // Depuración: Verificar el ID
    AreaEstudiante.findByIdAndUpdate(id, informeActualizado, { new: true })
      .then(data => {
        if (!data) {
          console.log(`Informe con ID: ${id} no encontrado`); // Depuración: Mensaje si no se encuentra
          return res.status(404).json({ message: 'Informe no encontrado' });
        }
        res.json(data);
      })
      .catch(error => {
        console.error('Error al actualizar el informe', error); // Depuración: Ver errores
        res.status(400).json({ message: 'Error al actualizar el informe', error });
      });
  });







router.get('/areasEstudiantes', async (req,res)=>{

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
                                    .populate('areaId')

    const areaTotal = await Materia.countDocuments(searchParams)
   res.send({
    materia:areasDb,
    total:areasTotal

   });
} catch (error) {
    res.send(error);
}
})

module.exports = router;