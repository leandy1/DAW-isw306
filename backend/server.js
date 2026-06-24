const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/citas', require('./routes/citas'));
app.use('/api/configuracion', require('./routes/configuracion'));

//Ruta de inicio
app.use('/', (req, res)=>{
    res.json({
        mensaje: 'Bienvenido a la Api'

    });


});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});