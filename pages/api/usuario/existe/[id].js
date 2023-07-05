import { pool } from "@/config/db";

export default async function handler(req, res) {
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
