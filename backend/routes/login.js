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

    if (err) {
        console.error("ERROR EN CONSULTA MYSQL:", err);

        return res.status(500).json({
            mensaje: "Error al consultar la base de datos"
        });
    }

    console.log("USUARIO:", usuario);
    console.log("RESULTADOS:", resultados);

    if (resultados.length > 0) {
        res.cookie("usuario", resultados[0].usuario, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 8
        });

        res.json({
            mensaje: "Login correcto"
        });
     

    } else {

        res.status(401).json({
            mensaje: "Usuario o contraseña incorrectos"
        });

    }
});
});

router.get("/verificar", (req, res) => {

    if (req.cookies && req.cookies.usuario) {
        return res.status(200).json({
            autenticado: true,
            usuario: req.cookies.usuario
        });
    }

    res.status(401).json({
        autenticado: false
    });

});


router.post("/logout", (req, res) => {
     res.clearCookie("usuario", {
        httpOnly: true,
        secure: true,
        sameSite: "lax"
    });

    res.json({
        mensaje: "Sesión cerrada"
    });
  
});

module.exports = router;