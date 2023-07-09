import { pool } from "@/config/db";
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  const origen= req.headers.host;
  const expresion = /[^(localhost)]/;
  if(!origen.search(expresion)){
    if (!session || session.rol != "superadmin") {
      res.status(403).json({ message: "Por favor, contacte al administrador" });
      return;
    }
  }
  
  switch (req.method) {
    case "POST":
      return await adicionarEntidad(req, res);
    default:
      return await obtenerTodosEntidades(req, res);
  }
}

const adicionarEntidad = async (req, res) => {
  try {
    const { uid, nombre, subordinado, subordinacion } = req.body;
    const [result] = await pool.promise().query("INSERT INTO entidad SET ?", {
      uid,
      nombre,
      subordinado,
      subordinacion,
    });
    return res.status(200).json({ nombre });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const obtenerTodosEntidades = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query("SELECT uid as id, nombre, subordinado, subordinacion FROM entidad ORDER BY nombre ASC");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
