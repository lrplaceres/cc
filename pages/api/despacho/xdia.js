import { pool } from "@/config/db";
import moment from "moment";


export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await combustiblesXdia(req, res);
    default:
      return ;
  }
}

const combustiblesXdia = async (req, res) => {
  var { dia } = req.body;
  var fecha2 = moment(dia).utc().format("YYYY-MM-DD");
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT d.combustible as id, c.nombre FROM despacho d INNER JOIN combustible c ON d.combustible = c.uid WHERE d.fecha = ? GROUP BY id ORDER BY d.combustible ASC",
        [fecha2]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
