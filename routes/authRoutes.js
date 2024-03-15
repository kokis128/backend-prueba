const express = require('express');
const router = express.Router();
const User = require('../models/user');

// routes/authRoutes.js


router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        // Crear un nuevo usuario
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId, 'username password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Ruta para borrar un usuario por su ID
router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        // Buscar el usuario por su ID y borrarlo
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

module.exports = router;










module.exports = router;