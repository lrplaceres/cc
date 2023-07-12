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
      return await asignadoxMes(req, res);
    default:
      return;
  }
}

const asignadoxMes = async (req, res) => {
  var { identidad, mes, anno, combustible } = req.body;
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT a.uid as id, a.combustible, a.cantidad, a.entidad, a.fecha, c.nombre FROM asignacion a INNER JOIN combustible c ON a.combustible = c.uid WHERE a.entidad = ? AND YEAR(a.fecha) = ? AND MONTH(a.fecha) = ? AND a.combustible = ? ORDER BY a.fecha DESC, a.cantidad DESC",
        [identidad, anno, mes, combustible]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
