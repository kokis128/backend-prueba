const express = require('express');
const router = express.Router();
const Materia = require('../models/materias');

const Anotacion = require('../models/anotaciones');

router.get('/planillas/:id', async (req, res) => {
    const _id = req.params.id
   
    console.log(_id);
    try {
        const materia = await Materia.findById(_id).populate('estudiantes');
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        const estudianteIds = materia.estudiantes.map(estudiante => estudiante._id);
        const anotaciones = await Anotacion.find({ student_id: { $in: estudianteIds } });

        const response = {
            materia,
            anotaciones
        };

        res.json(response);

        
    } catch (err) {
        
        res.status(500).json({ message: err.message });
    }
});





module.exports = router;







module.exports = router;