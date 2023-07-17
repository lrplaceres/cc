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
      return await buscarAutorizosMesEntidad(req, res);
    default:
      return;
  }
}
/*
*parametros : año, mes, entidad
*busca los tipos de combustibles autorizados en el mes y su cantidad 
*busca la cantidad de combustible distribuida entre de las entidades de subornidacion
*/
const buscarAutorizosMesEntidad = async (req, res) => {
  var { anno, mes, identidad } = req.body;
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT a.combustible, COALESCE(SUM(a.cantidad),0) as cantidad, c.nombre , (SELECT COALESCE(SUM(d.cantidad),0) as cont from distribucion d WHERE d.entidad IN (SELECT e.uid FROM entidad e WHERE e.subordinado = ? ) AND YEAR(d.fecha) =  ? AND MONTH(d.fecha) = ? AND a.combustible = d.combustible) as distribuido FROM autorizo a INNER JOIN combustible c ON a.combustible = c.uid WHERE a.entidad = ? AND YEAR(a.fecha) = ? AND MONTH(a.fecha) = ? GROUP BY a.combustible ORDER BY c.nombre ASC",
        [identidad, anno, mes, identidad, anno, mes]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};