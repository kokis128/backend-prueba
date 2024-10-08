const express = require('express');
const router = express.Router();
const Materia = require('../models/materias');
const Estudiante = require('../models/estudiantes');
const Curso = require('../models/cursos');

// Crear un estudiante (ya está implementado correctamente)
router.post('/estudiante', async (req, res) => {    
    try {
        const { nombre, apellido, dni, observaciones, materiaId, cursoId } = req.body;
        const estudianteBd = await Estudiante.findOne({ dni });
      
        if (estudianteBd) {
            return res.status(400).json({ message: 'El Estudiante ya existe en la base de datos' });
        }

        // Crear un estudiante
        const newEstudiante = new Estudiante({ nombre, apellido, dni, observaciones, materiaId, cursoId });
        await newEstudiante.save();
        res.status(201).json({ message: 'Estudiante creado correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener todos los estudiantes
router.get('/estudiantes', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find({});
        res.json(estudiantes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Buscar un estudiante por DNI, nombre o apellido (modificación para recibir req.body)
router.post('/estudiantes/buscar', async (req, res) => {
    try {
        const { dni, nombre, apellido } = req.body;
        console.log('req',req.body);
        let estudiante;

        if (dni) {
            estudiante = await Estudiante.findOne({ dni });
        } else if (nombre && apellido) {
            estudiante = await Estudiante.findOne({
                nombre: { $regex: nombre, $options: 'i' },
                apellido: { $regex: apellido, $options: 'i' }
            });
        }
        

        if (!estudiante) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        }

        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Matricular un estudiante en una materia

router.put('/materia/:materiaId/matricular', async (req, res) => {
    try {
        const { estudiantes } = req.body; // Recibe una lista de IDs de estudiantes
        const materiaId = req.params.materiaId;

        // Verifica que la materia exista
        const materia = await Materia.findById(materiaId);
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        // Imprimir estudiantes matriculados en la materia
        console.log('Estudiantes matriculados actualmente:', materia.estudiantes);

        // Filtrar los estudiantes que ya están matriculados para no agregarlos de nuevo
        const nuevosEstudiantes = estudiantes.filter(estudianteId => 
            !materia.estudiantes.includes(estudianteId)
        );

        if (nuevosEstudiantes.length === 0) {
            return res.status(400).json({ message: 'Todos los estudiantes ya están matriculados' });
        }

        // Agregar solo los nuevos estudiantes a la materia
        materia.estudiantes.push(...nuevosEstudiantes);

        // Eliminar posibles duplicados usando un Set (opcional)
        materia.estudiantes = Array.from(new Set(materia.estudiantes));

        // Guardar los cambios
        await materia.save();

        res.status(200).json({ message: 'Estudiante(s) matriculado(s) con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Desmatricular estudiantes de una materia
router.put('/materia/:materiaId/desmatricular', async (req, res) => {
    try {
        const { estudiantes } = req.body; // Recibe una lista de IDs de estudiantes
        const materiaId = req.params.materiaId;
        console.log('materiaId',materiaId);
        console.log('estudiantes',estudiantes);

        // Verifica que la materia exista
        const materia = await Materia.findById(materiaId);
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
       
        // Filtrar los estudiantes que están actualmente matriculados
        const estudiantesMatriculados = materia.estudiantes.filter(estudianteId => 
            estudiantes.includes(estudianteId.toString())
        );
        console.log('estudiantes cant',estudiantesMatriculados.length);
        console.log('Estudiantes matriculados actualmente:', materia.estudiantes);

         if (estudiantesMatriculados.length === 0) {
            return res.status(400).json({ message: 'Ningún estudiante está matriculado en la materia' });
        }

        // Filtrar los estudiantes para desmatricular (eliminar de la lista)
        materia.estudiantes = materia.estudiantes.filter(estudianteId => 
            !estudiantes.includes(estudianteId.toString())
        );

        // Guardar los cambios
        await materia.save();

        res.status(200).json({ message: 'Estudiante(s) desmatriculado(s) con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Obtener estudiantes de un curso
router.get('/estudiantes/curso/:cursoId', async (req, res) => {
    try {
        const cursoId = req.params.cursoId;
        const estudiantes = await Estudiante.find({ cursoId });

        if (estudiantes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron estudiantes para este curso' });
        }

        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/materia/:materiaId', async (req, res) => {
    try {
        const { materiaId } = req.params;

        // Verifica que la materia exista y recupera los estudiantes directamente desde la base de datos
        const materia = await Materia.findById(materiaId).populate('estudiantes');
        
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        // Estudiantes ya están "populados" gracias a populate
        const estudiantesBd = materia.estudiantes;

        // Imprimir estudiantes matriculados en la materia
        console.log('Estudiantes matriculados actualmente:', estudiantesBd);

        res.status(200).json(estudiantesBd);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});






// Obtener todos los cursos
router.get('/cursos', async (req, res) => {
    try {
        const cursos = await Curso.find({});
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/estudiante/:id', async (req, res) => {
    const estudianteId = req.params.id;
  
    try {
      const result = await Estudiante.findByIdAndDelete(estudianteId);
  
      if (!result) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
  
      res.status(200).json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });


  router.delete('/estudiante/:id', async (req, res) => {
    const estudianteId = req.params.id;
  
    try {
      const result = await Estudiante.findByIdAndDelete(estudianteId);
  
      if (!result) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
  
      res.status(200).json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
module.exports = router;
