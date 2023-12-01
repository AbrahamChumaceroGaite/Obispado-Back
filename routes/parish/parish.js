const express = require('express');
const router = express.Router();
const {queryDatabase} = require('../../services/db/query');

const { insertParish, getParishesLazyLoading, getParishById, getAllParishes,getTotalParishes,updateParish, deleteParish } = require('./query');


router.post("/post", async (req, res) => {
  const { Name, Direction, Phone } = req.body;

  try {
    const result = await insertParish({ Name, Direction, Phone });
    res.json({ mensaje: 'Registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar' });
  }
});

router.get("/get", async (req, res) => {
  const { first, rows, globalFilter, sortField, sortOrder } = req.query;
  const startIndex = parseInt(first);
  const numRows = parseInt(rows);

  try {
    const certificateQuery = await getParishesLazyLoading(startIndex, numRows, globalFilter, sortField, sortOrder);
    const certificates = await queryDatabase(certificateQuery);

    const totalFilasQuery = await getTotalParishes(globalFilter);
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

router.get("/getId/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await getParishById(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la parroquia por ID' });
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
  const updateData = req.body;

  try {
    const result = await updateParish(id, updateData);
    res.json({ mensaje: 'Registro actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el registro' });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await deleteParish(id);
    res.json({ mensaje: 'Registro eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el registro' });
  }
});

module.exports = router;