import { pool } from "@/config/db";
import moment from "moment";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await buscarAsignacionesMes(req, res);
    default:
      return;
  }
}

const buscarAsignacionesMes = async (req, res) => {
  var { anno, mes, identidad } = req.body;
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT SUM(a.cantidad) as cantidad, c.nombre, @uid:=@uid+1 AS id FROM asignacion a INNER JOIN combustible c ON a.combustible = c.uid WHERE a.entidad = ? AND YEAR(a.fecha) = ? AND MONTH(a.fecha) = ? GROUP BY a.combustible",
        [identidad, anno, mes]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
