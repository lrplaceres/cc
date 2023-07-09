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
    case "DELETE":
      return await eliminarUsuario(req, res);
    case "PUT":
      return await actualizarUsuario(req, res);
    case "POST":
      return await cambiarUsuarioContrasena(req, res);
    default:
      return await obtenerUsuario(req, res);
  }
}

const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool
      .promise()
      .query(
        "SELECT uid, nombre, usuario, correo, entidad, rol, activo FROM usuario WHERE uid = ?",
        [id]
      );
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.query;
  const { nombre, correo, entidad, rol, activo } = req.body;
  try {
    await pool
      .promise()
      .query(
        "UPDATE usuario SET nombre = ?, correo = ?, entidad = ?, rol = ?, activo = ? WHERE uid = ?",
        [nombre, correo, entidad, rol, activo, id]
      );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.promise().query("DELETE FROM usuario WHERE uid = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const cambiarUsuarioContrasena = async (req, res) => {
  const { id } = req.query;
  const { contrasena } = req.body;
  try {
    await pool
      .promise()
      .query("UPDATE usuario SET contrasena = ? WHERE uid = ?", [
        contrasena,
        id,
      ]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
