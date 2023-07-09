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
    default:
      return await obtenerTodosEntidades(req, res);
  }
}

  const obtenerTodosEntidades = async (req, res) => {
    try {
      const [result] = await pool
        .promise()
        .query("SELECT e2.uid as id, e2.nombre, e2.subordinado AS sub_id, e1.nombre as subordinado, e2.subordinacion FROM entidad e1, entidad e2 WHERE e1.uid = e2.subordinado OR e2.subordinado = '' GROUP BY e2.uid ORDER BY e2.nombre ASC");
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };