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
    default:
      return await obtenerSubordinados(req, res);
  }
}

const obtenerSubordinados = async (req, res) => {
  try {
    const { identidad } = req.body;
    const [result] = await pool
      .promise()
      .query(
        "SELECT uid, nombre FROM entidad  WHERE subordinado = ? ORDER BY nombre ASC",
        [identidad]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
