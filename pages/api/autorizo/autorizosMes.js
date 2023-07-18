import { pool } from "@/config/db";
import moment from "moment";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  const origen = req.headers.host;
  const expresion = /[^(localhost)]/;
  if (!origen.search(expresion)) {
    if (!session || session.rol != "superadmin") {
      res.status(403).json({ message: "Por favor, contacte al administrador" });
      return;
    }
  }

  switch (req.method) {
    case "POST":
      return await obtenerDespachosMes(req, res);
    default:
      return;
  }
}
/*parametros: anno, mes
 *busca los autorizos agrupados por tipo de combustible
 */
const obtenerDespachosMes = async (req, res) => {
  try {
    var { anno, mes } = req.body;
    const [result] = await pool
      .promise()
      .query(
        "SELECT SUM(d.cantidad) as cantidad, c.nombre FROM autorizo d INNER JOIN combustible c ON d.combustible = c.uid WHERE YEAR(d.fecha) = ? AND MONTH(d.fecha) = ? GROUP BY d.combustible ORDER BY c.nombre ASC",
        [anno, mes]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
