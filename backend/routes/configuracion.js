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


// POST - Agregar servicio
router.post('/servicio', (req, res) => {
  const { nombre, precio, grupo_id } = req.body;
  db.query('INSERT INTO servicios (nombre, precio, grupo_id) VALUES (?, ?, ?)',
    [nombre, precio, grupo_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, mensaje: 'Servicio agregado' });
    });
});

// POST - Agregar tecnico
router.post('/tecnico', (req, res) => {
  const { nombre } = req.body;
  db.query('INSERT INTO tecnicos (nombre) VALUES (?)', [nombre], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, mensaje: 'Tecnico agregado' });
  });
});

// POST - Agregar estado
router.post('/estado', (req, res) => {
  const { nombre } = req.body;
  db.query('INSERT INTO estados (nombre) VALUES (?)', [nombre], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, mensaje: 'Estado agregado' });
  });
});

// POST - Agregar marca
router.post('/marca', (req, res) => {
  const { nombre } = req.body;
  db.query('INSERT INTO marcas (nombre) VALUES (?)', [nombre], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, mensaje: 'Marca agregada' });
  });
});

// POST - Agregar grupo
router.post('/grupo', (req, res) => {
  const { nombre } = req.body;
  db.query('INSERT INTO grupos (nombre) VALUES (?)', [nombre], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, mensaje: 'Grupo agregado' });
  });
});

// DELETE - Eliminar servicio
router.delete('/servicio/:id', (req, res) => {
  db.query('DELETE FROM servicios WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Servicio eliminado' });
  });
});

// DELETE - Eliminar tecnico
router.delete('/tecnico/:id', (req, res) => {
  db.query('DELETE FROM tecnicos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Tecnico eliminado' });
  });
});

// DELETE - Eliminar estado
router.delete('/estado/:id', (req, res) => {
  db.query('DELETE FROM estados WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Estado eliminado' });
  });
});

// DELETE - Eliminar marca
router.delete('/marca/:id', (req, res) => {
  db.query('DELETE FROM marcas WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Marca eliminada' });
  });
});

// DELETE - Eliminar grupo
router.delete('/grupo/:id', (req, res) => {
  db.query('DELETE FROM grupos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Grupo eliminado' });
  });
});


module.exports = router;