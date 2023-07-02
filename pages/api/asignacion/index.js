import { pool } from "@/config/db";
import moment from "moment";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await adicionarAsignacion(req, res);
    default:
      return await obtenerTodosAsignaciones(req, res);
  }
}

const adicionarAsignacion = async (req, res) => {
  try {
    var { fecha } = req.body;
    var fecha2 = moment(fecha).utc().format("YYYY-MM-DD");
    fecha = fecha2;
    const { uid, combustible, cantidad, entidad } = req.body.asignacion;
    const [result] = await pool
      .promise()
      .query("INSERT INTO asignacion SET ?", {
        uid,
        combustible,
        cantidad,
        entidad,
        fecha,
      });
    return res.status(200).json({ cantidad });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const obtenerTodosAsignaciones = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT a.uid, a.cantidad, a.fecha, c.nombre as combustible, e.nombre as entidad FROM asignacion a INNER JOIN combustible c ON a.combustible = c.uid INNER JOIN entidad e ON a.entidad = e.uid ORDER BY a.fecha DESC, combustible ASC, entidad ASC"
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
