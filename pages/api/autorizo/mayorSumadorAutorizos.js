import { pool } from "@/config/db";
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
      return await obtenerTopAutorizos(req, res);
    default:
      return;
  }
}
/*parametros: anno, mes
 *busca las entidades con mayor suma de autorizos
 */
const obtenerTopAutorizos = async (req, res) => {
  try {
    var { anno, mes } = req.body;
    const [result] = await pool
      .promise()
      .query(
        "SELECT e.nombre, SUM(a.cantidad) AS cantidad FROM autorizo a INNER JOIN entidad e ON a.entidad = e.uid WHERE YEAR(a.fecha) = ? AND MONTH(a.fecha) = ? GROUP BY a.entidad ORDER BY cantidad DESC LIMIT 10",
        [anno, mes]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};