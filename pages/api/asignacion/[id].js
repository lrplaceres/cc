import { pool } from "@/config/db";
import moment from "moment";

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      return await eliminarAsignacion(req, res);
    case "PUT":
      return await actualizarAsignacion(req, res);
    default:
      return await obtenerAsignacion(req, res);
  }
}

const obtenerAsignacion = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool
      .promise()
      .query("SELECT * FROM asignacion  WHERE uid = ?", [id]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const actualizarAsignacion = async (req, res) => {
  const { id } = req.query;
  var { fecha } = req.body;
  var fecha2 = moment(fecha).utc().format("YYYY-MM-DD");
  fecha = fecha2;
  const { combustible, cantidad, entidad } = req.body.asignacion;
  try {
    await pool
      .promise()
      .query(
        "UPDATE asignacion SET combustible = ?, cantidad = ?,entidad = ?, fecha = ? WHERE uid = ?",
        [combustible, cantidad, entidad, fecha, id]
      );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const eliminarAsignacion = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.promise().query("DELETE FROM asignacion WHERE uid = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
