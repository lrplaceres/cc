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
  var { identidad, value, mes, anno } = req.body;
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT SUM(a.cantidad) as asignado FROM asignacion a WHERE a.entidad = ? AND a.combustible = ? AND YEAR(a.fecha) = ? AND MONTH(a.fecha) = ? ",
        [identidad, value, anno, mes]
      );
    return res.status(200).json(result[0].asignado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
