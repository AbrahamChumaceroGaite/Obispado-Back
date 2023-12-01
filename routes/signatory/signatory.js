const express = require('express');
const router = express.Router();
const {queryDatabase} = require('../../services/db/query');
const { getSignatoriesLazyLoading, getSignatories, createSignatory, getSignatoryById, getTotalSignatories, getAllParishes, updateSignatory, deleteSignatory } = require('./query');

router.post("/post", async (req, res) => {
  const { Name, SurName, Position, Verified } = req.body;

  try {
    const result = await createSignatory({ Name, SurName, Position, Verified });
    res.json({ mensaje: 'Registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar signatario' });
  }
});

router.get("/get", async (req, res) => {
  const { first, rows, globalFilter, sortField, sortOrder } = req.query;
  const startIndex = parseInt(first);
  const numRows = parseInt(rows);

  try {
    const certificateQuery = await getSignatoriesLazyLoading(startIndex, numRows, globalFilter, sortField, sortOrder);
    const certificates = await queryDatabase(certificateQuery);

    const totalFilasQuery = await getTotalSignatories(globalFilter);
    const totalFilasResult = await queryDatabase(totalFilasQuery);
    const total = totalFilasResult[0].totalFilas;

    if (total.length === 0) {
      res.status(404).send({ mensaje: "Error al obtener datos" });
    } else {
      res.send({ filas: certificates, totalFilas: total });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ mensaje: "Error al obtener datos" });
  }
});

router.get("/SignatorySelect", async (req, res) => {
  try {
    const result = await getSignatories();
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener signatarios' });
  }
});

router.get("/getId/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await getSignatoryById(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener signatario por ID' });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const result = await getAllParishes();
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener todas las parroquias' });
  }
});

router.put("/put/:id", async (req, res) => {
  const id = req.params.id;
  const { Name, SurName, Position, Verified } = req.body;

  const updateFields = {};

  if (Name) updateFields.Name = Name;
  if (SurName) updateFields.SurName = SurName;
  if (Position) updateFields.Position = Position;
  if (Verified !== undefined) updateFields.Verified = Verified;

  try {
    const result = await updateSignatory(id, updateFields);
    res.json({ mensaje: 'Registro actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el signatario' });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await deleteSignatory(id);
    res.json({ mensaje: 'Registro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el signatario' });
  }
});

module.exports = router;