const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Obtener citas con filtros opcionales
router.get('/', (req, res) => {
  const {
    nombre, apellido, cedula,
    marca, modelo, anio, color, placa,
    estado, tecnico
  } = req.query;

  let sql = 'SELECT * FROM citas WHERE 1=1';
  const vals = [];

  if (nombre) {
    sql += ' AND nombre LIKE ?';
    vals.push(`%${nombre}%`);
  }

  if (apellido) {
    sql += ' AND apellido LIKE ?';
    vals.push(`%${apellido}%`);
  }

  if (cedula) {
    sql += ' AND cedula LIKE ?';
    vals.push(`%${cedula}%`);
  }

  if (marca) {
    sql += ' AND marca LIKE ?';
    vals.push(`%${marca}%`);
  }

  if (modelo) {
    sql += ' AND modelo LIKE ?';
    vals.push(`%${modelo}%`);
  }

  if (anio) {
    sql += ' AND anio LIKE ?';
    vals.push(`%${anio}%`);
  }

  if (color) {
    sql += ' AND color LIKE ?';
    vals.push(`%${color}%`);
  }

  if (placa) {
    sql += ' AND placa LIKE ?';
    vals.push(`%${placa}%`);
  }

  if (estado) {
    sql += ' AND estado = ?';
    vals.push(estado);
  }

  if (tecnico) {
    sql += ' AND tecnicoAsignado = ?';
    vals.push(tecnico);
  }

  sql += ' ORDER BY creado_en DESC';

  db.query(sql, vals, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

module.exports = router;