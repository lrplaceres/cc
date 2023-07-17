import { pool } from "@/config/db";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(403).json({ message: "Por favor, contacte al administrador" });
    return;
  }

  switch (req.method) {
    case "POST":
      return await distribuidoxMes(req, res);
    default:
      return;
  }
}
/*parametros: anno,mes,entidad
 *busca la distribucion que le han hecho a una entidad 
 */
const distribuidoxMes = async (req, res) => {
  var { identidad, mes, anno } = req.body;
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT COALESCE(SUM(w.cantidad),0) AS distribuido , c.nombre, w.combustible FROM distribucion w INNER JOIN combustible c ON w.combustible = c.uid WHERE w.entidad = ? AND YEAR(w.fecha) = ? AND MONTH(w.fecha) = ? GROUP BY w.combustible ORDER BY c.nombre ASC",
        [identidad, anno, mes]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};