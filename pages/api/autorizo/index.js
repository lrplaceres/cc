import { pool } from "@/config/db";
import moment from "moment";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  const origen= req.headers.host;
  const expresion = /[^(localhost)]/;
  if(!origen.search(expresion)){
    if (!session) {
      res.status(403).json({ message: "Por favor, contacte al administrador" });
      return;
    }
  }
  
  switch (req.method) {
    case "POST":
      return await adicionarAutorizo(req, res);
    default:
      return await obtenerTodosAutorizos(req, res);
  }
}

const adicionarAutorizo = async (req, res) => {
  try {
    var { fecha } = req.body;
    var fecha2 = moment(fecha).utc().format("YYYY-MM-DD");
    fecha = fecha2;
    const { uid, combustible, cantidad, entidad } = req.body.autorizo;
    const [result] = await pool
      .promise()
      .query("INSERT INTO autorizo SET ?", {
        uid,
        combustible,
        cantidad,
        entidad,
        fecha,
      });
    return res.status(200).json({ cantidad });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const obtenerTodosAutorizos = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT a.uid as id, a.cantidad, a.fecha, c.nombre as combustible, e.nombre as entidad FROM autorizo a INNER JOIN combustible c ON a.combustible = c.uid INNER JOIN entidad e ON a.entidad = e.uid ORDER BY a.fecha DESC, combustible ASC, entidad ASC"
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
