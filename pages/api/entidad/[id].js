import { pool } from "@/config/db";
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session || session.rol != "superadmin") {
    res.status(403).json({ message: "Por favor, contacte al administrador" });
    return;
  }

  switch (req.method) {
    case "DELETE":
      return await eliminarEntidad(req, res);
    case "PUT":
      return await actualizarEntidad(req, res);
    default:
      return await obtenerEntidad(req, res);
  }
}

const obtenerEntidad = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool
      .promise()
      .query("SELECT * FROM entidad  WHERE uid = ?", [id]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const actualizarEntidad = async (req, res) => {
  const { id } = req.query;
  const { nombre, subordinado, subordinacion } = req.body;
  try {
    await pool
      .promise()
      .query(
        "UPDATE entidad SET nombre = ?, subordinado = ?, subordinacion = ? WHERE uid = ?",
        [nombre, subordinado, subordinacion, id]
      );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const eliminarEntidad = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.promise().query("DELETE FROM entidad WHERE uid = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};