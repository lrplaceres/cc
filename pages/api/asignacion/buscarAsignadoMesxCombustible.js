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
      return await buscarAsignacionesMes(req, res);
    default:
      return;
  }
}

const buscarAsignacionesMes = async (req, res) => {
  var { anno, mes, identidad, combustible } = req.body;
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT a.combustible, COALESCE(SUM(a.cantidad),0) as cantidad, c.nombre , (SELECT COALESCE(SUM(b.cantidad),0) as cont from asignacion b WHERE b.entidad IN (SELECT e.uid FROM entidad e WHERE e.subordinado = ? ) AND YEAR(b.fecha) =  ? AND MONTH(b.fecha) = ? AND a.combustible = b.combustible) as distribuido FROM asignacion a INNER JOIN combustible c ON a.combustible = c.uid WHERE a.entidad = ? AND YEAR(a.fecha) = ? AND MONTH(a.fecha) = ? AND a.combustible = ? GROUP BY a.combustible ORDER BY c.nombre ASC",
        [identidad, anno, mes, identidad, anno, mes, combustible]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
