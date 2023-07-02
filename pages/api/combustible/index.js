import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await adicionarCombustible(req, res);
    default:
      return await obtenerTodoscombustibles(req, res);
  }
}

const adicionarCombustible = async (req, res) => {
  try {
    const { uid, nombre } = req.body;
    const [result] = await pool
      .promise()
      .query("INSERT INTO combustible SET ?", {
        uid,
        nombre,
      });
    return res.status(200).json({ nombre });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const obtenerTodoscombustibles = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query("SELECT uid as id,nombre FROM combustible ORDER BY nombre ASC");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
