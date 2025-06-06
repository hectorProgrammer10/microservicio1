// ----- Archivo: src/application/viaje.service.js -----
const Viaje = require("../domain/viaje.model");

exports.crearViaje = async (req, res) => {
  try {
    const { origen, destino, tarifa, pasajeroId } = req.body;
    const nuevoViaje = await Viaje.create({
      origen,
      destino,
      tarifa,
      pasajeroId,
    });
    res.status(201).json(nuevoViaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerViajePorId = async (req, res) => {
  try {
    const viaje = await Viaje.findByPk(req.params.id);
    if (!viaje) return res.status(404).json({ error: "Viaje no encontrado" });
    res.json(viaje);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.asignarConductor = async (req, res) => {
  try {
    const viaje = await Viaje.findByPk(req.params.id);
    if (!viaje) return res.status(404).json({ error: "Viaje no encontrado" });

    const { conductorId } = req.body;
    viaje.conductorId = conductorId;
    viaje.estado = "en_curso";
    await viaje.save();

    res.json({ mensaje: "Conductor asignado", viaje });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.finalizarViaje = async (req, res) => {
  try {
    const viaje = await Viaje.findByPk(req.params.id);
    if (!viaje) return res.status(404).json({ error: "Viaje no encontrado" });

    viaje.estado = "finalizado";
    await viaje.save();

    res.json({ mensaje: "Viaje finalizado", viaje });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
