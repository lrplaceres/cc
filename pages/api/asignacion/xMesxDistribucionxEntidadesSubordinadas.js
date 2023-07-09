import { pool } from "@/config/db";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
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

const distribuidoxMes = async (req, res) => {
  var { identidad, mes, anno } = req.body;
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT b.uid as id, b.cantidad,b.fecha, c.nombre as combustible, e.nombre as entidad FROM asignacion b INNER JOIN combustible c ON b.combustible = c.uid INNER JOIN entidad e ON b.entidad = e.uid WHERE b.entidad IN (SELECT e.uid FROM entidad e WHERE e.subordinado = ? ) AND YEAR(b.fecha) = ? AND MONTH(b.fecha) = ? ORDER BY c.nombre ASC , e.nombre ASC",
        [identidad, anno, mes]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
