const express = require("express");
const router = express.Router();
const db = require("../db");


// POST - Login
router.post("/", (req, res) => {

const { usuario, password } = req.body;

if (!usuario || !password) {
    return res.status(400).json({
        mensaje: "Debe enviar usuario y contraseña"
    });
}
 
    const sql = `
       SELECT id, usuario
    FROM usuarios
    WHERE usuario = ?
    AND password = ?
    `;

   db.query(sql, [usuario, password], (err, resultados) => {

        if (resultados.length > 0) {
            req.session.usuario = resultados[0].usuario; 
            req.session.save((err) => {  

            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: "Login correcto" });
        });
        } else {
            res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

    });
});

router.get("/verificar", (req, res) => {

    if (req.session && req.session.usuario) {
        res.status(200).json({ autenticado: true });
    } else {
        res.status(401).json({ autenticado: false });
    }


});


router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ mensaje: "Sesión cerrada" });
  
});

module.exports = router;