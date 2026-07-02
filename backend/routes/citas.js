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

//POST: Agregar Cita
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
// DELETE: Eliminar Cita
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM citas WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Cita eliminada correctamente' });
    });
});
// PATCH: Eliminar Servicio de Cita
router.patch('/:id/servicio', (req, res) => {
    const { id } = req.params;
    const { servicio } = req.body;

    db.query('SELECT tiposServicios FROM citas WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const servicios = result[0].tiposServicios.split(',').map(s => s.trim());
        const nuevosServicios = servicios.filter(s => s !== servicio).join(',');

        db.query('UPDATE citas SET tiposServicios = ? WHERE id = ?', [nuevosServicios, id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Servicio eliminado correctamente' });
        });
    });
});

// PATCH: Agregar Servicio a Cita
router.patch('/:id/servicio/add', (req, res) => {
    const { id } = req.params;
    const { servicio } = req.body;

    db.query('SELECT tiposServicios FROM citas WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const serviciosActuales = result[0].tiposServicios 
            ? result[0].tiposServicios.split(',').map(s => s.trim()) 
            : [];

        if (serviciosActuales.includes(servicio)) {
            return res.status(400).json({ error: 'El servicio ya existe en la cita' });
        }

        serviciosActuales.push(servicio);
        const nuevosServicios = serviciosActuales.join(',');

        db.query('UPDATE citas SET tiposServicios = ? WHERE id = ?', [nuevosServicios, id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Servicio agregado correctamente' });
        });
    });
});

// PATCH: Editar Cita
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, cedula, telefono, correo, marca, modelo, anio, placa, color, tecnicoAsignado, descripcion, total } = req.body;

    db.query(
        'UPDATE citas SET nombre=?, apellido=?, cedula=?, telefono=?, correo=?, marca=?, modelo=?, anio=?, placa=?, color=?, tecnicoAsignado=?, descripcion=?, total=? WHERE id=?',
        [nombre, apellido, cedula, telefono, correo, marca, modelo, anio, placa, color, tecnicoAsignado, descripcion, total, id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Cita actualizada correctamente' });
        }
    );
});




module.exports = router;