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
/*parametros: anno,mes,entidad,value(combustible)
 *busca la distribucion que han hecho una entidad
 */
const distribuidoxMes = async (req, res) => {
  var { identidad, mes, anno, value } = req.body;
  
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT COALESCE(SUM(b.cantidad),0) AS distribuido FROM distribucion b INNER JOIN combustible c ON b.combustible = c.uid INNER JOIN entidad e ON b.entidad = e.uid WHERE b.entidad = ? AND YEAR(b.fecha) = ? AND MONTH(b.fecha) = ? AND b.combustible = ?",
        [identidad, anno, mes, value]
      );
    return res.status(200).json(result[0].distribuido);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};