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
      return await eliminarCombustible(req, res);
    case "PUT":
      return await actualizarCombustible(req, res);
    default:
      return await obtenerCombustible(req, res);
  }
}

const obtenerCombustible = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool
      .promise()
      .query("SELECT * FROM combustible  WHERE uid = ?", [id]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const actualizarCombustible = async (req, res) => {
  const { id } = req.query;
  const { nombre } = req.body;
  try {
    await pool
      .promise()
      .query(
        "UPDATE combustible SET nombre = ? WHERE uid = ?",
        [nombre, id]
      );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const eliminarCombustible = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.promise().query("DELETE FROM combustible WHERE uid = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
