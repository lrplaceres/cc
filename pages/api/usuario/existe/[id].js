import { pool } from "@/config/db";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.rol != "superadmin") {
    res.status(403).json({ message: "Por favor, contacte al administrador" });
    return;
  }

  switch (req.method) {
    default:
      return await contadorXusuario(req, res);
  }
}

const contadorXusuario = async (req, res) => {
  const { id } = req.query;
  try {
    const [result] = await pool
      .promise()
      .query("SELECT COUNT(usuario) as cont FROM usuario WHERE usuario = ?", [
        id,
      ]);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
