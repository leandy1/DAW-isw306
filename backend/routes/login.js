const express = require("express");
const router = express.Router();
const db = require("../db");

// POST - Login
router.post("/", (req, res) => {
  console.log("BODY:", req.body);
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

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (resultados.length === 0) {
            return res.status(401).json({
                mensaje: "Usuario o contraseña incorrectos"
            });
        }

        res.json({
            mensaje: "Login correcto",
            usuario: resultados[0]
        });

    });

});

module.exports = router;