const express = require("express");
const cors = require("cors");
require('dotenv').config();
const session = require('express-session');
const app = express();

app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true
}));

app.use(express.json());


app.use(session({
    secret: 'autotaller_secret',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 8 ,
        sameSite: 'lax',
        secure: false
    }
}));


//Rutas
app.use('/api/citas', require('./routes/citas'));
app.use('/api/configuracion', require('./routes/configuracion'));
app.use('/api/login', require('./routes/login'));

//Ruta de inicio
app.use('/', (req, res)=>{
    res.json({
        mensaje: 'Bienvenido a la Api'

    });


});

const PORT = process.env.DB_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});