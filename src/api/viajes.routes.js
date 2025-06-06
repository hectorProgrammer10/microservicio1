// ----- Archivo: src/api/viajes.routes.js -----
const express = require("express");
const router = express.Router();
const viajeService = require("../application/viaje.service");

router.post("/", viajeService.crearViaje);
router.get("/:id", viajeService.obtenerViajePorId);
router.put("/:id/asignar-conductor", viajeService.asignarConductor);
router.put("/:id/finalizar", viajeService.finalizarViaje);

module.exports = router;
