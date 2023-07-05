import { pool } from "@/config/db";
import moment from "moment";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await asignadoxfechaxdia(req, res);
    default:
      return;
  }
}

const asignadoxfechaxdia = async (req, res) => {
  var { fecha, value } = req.body;
  var fecha2 = moment(fecha).utc().format("YYYY-MM-DD");
  fecha = fecha2;
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT SUM(a.cantidad) as asignado FROM asignacion a WHERE a.fecha = ? AND a.combustible = ?",
        [fecha2, value]
      );
      return res.status(200).json(result[0].asignado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
