import { pool } from "@/config/db";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    switch (req.method) {
      case "POST":
        return await obtenerUsuario(req, res);
    }
  }

  res.status(401).json({ message: "403" });
  return;
}

const obtenerUsuario = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;
    const [result] = await pool
      .promise()
      .query(
        "SELECT u.uid, u.usuario, u.correo, u.rol, u.nombre, e.nombre as entidad FROM usuario u INNER JOIN entidad e ON u.entidad = e.uid WHERE usuario = ? and contrasena = ? and activo = 1 limit 1",
        [usuario, contrasena]
      );
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
