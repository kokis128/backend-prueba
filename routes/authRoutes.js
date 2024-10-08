const express = require('express');
const router = express.Router();
const User = require('../models/user');

// routes/authRoutes.js


router.post('/signup', async (req, res) => {
    const { nombre,apellido,email,password,funcion  } = req.body;
    
    try {
        console.log('email',email);
        // Verificar si el usuario ya existe en la base de datos
        const existingEmail = await User.findOne({email});
        console.log(existingEmail)
        if (existingEmail) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }else{
        // Crear un nuevo usuario
        const newUser = new User({ nombre,apellido,email,password,funcion });
        console.log(newUser);
        await newUser.save();
        
        res.status(201).json({ message: 'Usuario creado correctamente' })};
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
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
       
        res.status(200).send({user:user});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Ruta para borrar un usuario por su ID
router.delete('/user/:id', async (req, res) => {
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




router.post('/user/login', async (req, res) => {  
    
        try {
            const { email, password } = req.body;

            const userDB = await User.findOne({ email });           
            if (!userDB) {                
                return res.status(404).json({ msg: 'El usuario o la contraseña no son correctos' });                
            }
                     
            const isValidPassword = await password==userDB.password;
            if (!isValidPassword) {
                return res.status(401).json({ msg: 'El email o la contraseña son incorrectos' });
            }
            
           
            userDB.password=undefined;

            return res.status(200).json({
                ok:true,
                msg:'Login correcto',
                user : userDB

            })
            
        } catch (error) {

            res.status(400).json(error);
            
        }
  
      
       
   
});


module.exports = router;










