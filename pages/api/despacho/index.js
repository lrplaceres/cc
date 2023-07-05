import { pool } from "@/config/db";
import moment from "moment";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await adicionarDespacho(req, res);
    default:
      return await obtenerTodoscombustibles(req, res);
  }
}

const adicionarDespacho = async (req, res) => {
  try {
    var { fecha } = req.body;
    var fecha2 = moment(fecha).utc().format("YYYY-MM-DD");
    fecha = fecha2;
    const { uid, cantidad, combustible } = req.body.despacho;
    const [result] = await pool.promise().query("INSERT INTO despacho SET ?", {
      uid,
      cantidad,
      fecha,
      combustible,
    });
    return res.status(200).json({ cantidad });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const obtenerTodoscombustibles = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT d.uid as id, d.fecha, d.cantidad, c.nombre as combustible FROM despacho d INNER JOIN combustible c ON d.combustible = c.uid ORDER BY fecha ASC"
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
