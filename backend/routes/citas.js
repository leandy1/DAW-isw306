const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Obtener citas con filtros opcionales
router.get('/', (req, res) => {
    db.query('SELECT * FROM citas ORDER BY creado_en DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.post('/add', (req, res) => {
  const { nombre, apellido, cedula, telefono, correo, marca, modelo, anio, placa, color, tiposServicios, tecnicoAsignado, estado, descripcion, total } = req.body;

  db.query(
    'INSERT INTO citas (nombre, apellido, cedula, telefono, correo, marca, modelo, anio, placa, color, tiposServicios, tecnicoAsignado, estado, descripcion, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, apellido, cedula, telefono, correo, marca, modelo, anio, placa, color, tiposServicios, tecnicoAsignado, estado, descripcion, total],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, mensaje: 'Cita agregada' });
    }
  );
});


module.exports = router;