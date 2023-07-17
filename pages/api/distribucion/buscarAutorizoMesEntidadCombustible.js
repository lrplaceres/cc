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
      return await buscarAutorizosMesEntidadCombustible(req, res);
    default:
      return;
  }
}
/*parametros: anno,mes,entidad,value(combustible)
 *busca las autorizos que han hecho a una entidad
 */
const buscarAutorizosMesEntidadCombustible = async (req, res) => {
  var { anno, mes, identidad,value } = req.body;
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT COALESCE(SUM(a.cantidad),0) as cantidad FROM autorizo a WHERE a.entidad = ? AND YEAR(a.fecha) = ? AND MONTH(a.fecha) = ? AND a.combustible = ? ",
        [identidad, anno, mes,value]
      );
    return res.status(200).json(result[0].cantidad);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};