const express = require('express');
const router = express.Router();
const db = require('../db');


// GET - Obtener toda la configuracion
router.get('/', (req, res) => {

  const queryServicios = 'SELECT * FROM servicios';
  const queryTecnicos  = 'SELECT * FROM tecnicos';
  const queryEstados   = 'SELECT * FROM estados';
  const queryMarcas    = 'SELECT * FROM marcas';
  const queryGrupos    = 'SELECT * FROM grupos';

  db.query(queryServicios, (err, servicios) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(queryTecnicos, (err, tecnicos) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(queryEstados, (err, estados) => {
        if (err) return res.status(500).json({ error: err.message });

        db.query(queryMarcas, (err, marcas) => {
          if (err) return res.status(500).json({ error: err.message });

          db.query(queryGrupos, (err, grupos) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ servicios, tecnicos, estados, marcas, grupos });
          });
        });
      });
    });
  });
});



module.exports = router;