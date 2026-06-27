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
  const queryGruposServicios = 'SELECT gs.grupo_id, s.id, s.nombre, s.precio FROM grupo_servicios gs JOIN servicios s ON gs.servicio_id = s.id';

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
            db.query(queryGruposServicios, (err, gruposServicios) => {
              if (err) return res.status(500).json({ error: err.message });

              // Vincular servicios a cada grupo
              const gruposConServicios = grupos.map(g => ({
                ...g,
                servicios: gruposServicios.filter(gs => gs.grupo_id === g.id)
              }));

              res.json({ servicios, tecnicos, estados, marcas, grupos: gruposConServicios });
            });
          });
        });
      });
    });
  });
});


// POST - Agregar servicio
router.post('/servicio', (req, res) => {
  const { nombre, precio, grupo_id } = req.body;

  db.query(
    'INSERT INTO servicios (nombre, precio, grupo_id) VALUES (?, ?, ?)',
    [nombre, precio, grupo_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        id: result.insertId,
        mensaje: 'Servicio agregado'
      });
    }
  );
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

  db.query(
    'INSERT INTO estados (nombre) VALUES (?)',
    [nombre],
    (err, result) => {

      if (err) {
        console.log(err);   // <-- Agrega esta línea
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: result.insertId,
        mensaje: 'Estado agregado'
      });

    }
  );
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
// POST - Agregar Servicio a Grupo
router.post('/grupo/:id/servicios', (req, res) => {
    const { id } = req.params;
    const { servicios } = req.body; 

    const valores = servicios.map(servicio_id => [id, servicio_id]);

    db.query('INSERT INTO grupo_servicios (grupo_id, servicio_id) VALUES ?', 
    [valores], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: 'Servicios agregados al grupo' });
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
    const { id } = req.params;

    db.query('DELETE FROM grupo_servicios WHERE grupo_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        db.query('DELETE FROM grupos WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Grupo eliminado' });
        });
    });
});
router.delete('/grupo/:grupoId/servicio/:servicioId', (req, res) => {
    const { grupoId, servicioId } = req.params;

    db.query('DELETE FROM grupo_servicios WHERE grupo_id = ? AND servicio_id = ?', 
    [grupoId, servicioId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Servicio eliminado del grupo' });
    });
});




module.exports = router;