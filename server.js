const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const materiasRoutes = require('./routes/materiasRoutes');
const clasesRoutes = require('./routes/clasesRoutes');
const estudiantesRoutes = require('./routes/estudiantesRoutes');
const ausenciasRoutes = require('./routes/ausenciasRoutes');
const anotacionesRoutes = require('./routes/anotacionesRoutes');
const planillasRoutes = require('./routes/planillasRoutes');
const cors = require('cors')


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', materiasRoutes);
app.use('/api', clasesRoutes);
app.use('/api', estudiantesRoutes);
app.use('/api', ausenciasRoutes);
app.use('/api', anotacionesRoutes);
app.use('/api', planillasRoutes);


// Conectar a la base de datos MongoDB
{/*`mongodb+srv://koki:${'2541Koki'}@cluster0.t72sj29.mongodb.net/escuela?retryWrites=true&w=majority&appName=Cluster0`*/}

mongoose.connect(`mongodb+srv://koki:${'2541Koki'}@cluster0.t72sj29.mongodb.net/escuela?retryWrites=true&w=majority&appName=Cluster0`,

{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexión a MongoDB establecida");
}).catch(err => {
    console.error("Error de conexión a MongoDB:", err);
});


// Manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// Manejar errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error interno del servidor" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});





























