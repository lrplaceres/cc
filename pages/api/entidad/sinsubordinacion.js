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
    default:
      return await obtenerTodosEntidades(req, res);
  }
}

const obtenerTodosEntidades = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT uid as id, nombre, subordinado, subordinacion FROM entidad WHERE subordinacion <> 0 ORDER BY nombre ASC"
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
