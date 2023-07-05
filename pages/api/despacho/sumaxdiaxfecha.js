import { pool } from "@/config/db";
import moment from "moment";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await sumaXdiaXfecha(req, res);
    default:
      return;
  }
}

const sumaXdiaXfecha = async (req, res) => {
  var { fecha, value } = req.body;
  var fecha2 = moment(fecha).utc().format("YYYY-MM-DD");
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT SUM(d.cantidad) as suma FROM despacho d WHERE d.fecha = ? AND d.combustible = ?",
        [fecha2, value]
      );
    return res.status(200).json(result[0].suma);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
