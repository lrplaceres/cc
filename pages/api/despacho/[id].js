import { pool } from "@/config/db";
import moment from "moment";
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
      return await eliminarDespacho(req, res);
    case "PUT":
      return await actualizarDespacho(req, res);
    default:
      return await obtenerDespacho(req, res);
  }
}

const obtenerDespacho = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool
      .promise()
      .query("SELECT * FROM despacho  WHERE uid = ?", [id]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const actualizarDespacho = async (req, res) => {
  const { id } = req.query;
  var { fecha } = req.body;
  var fecha2 = moment(fecha).utc().format("YYYY-MM-DD");
  fecha = fecha2;
  const { cantidad, combustible } = req.body.despacho;
  try {
    await pool
      .promise()
      .query(
        "UPDATE despacho SET combustible = ?, cantidad = ?, fecha = ? WHERE uid = ?",
        [combustible, cantidad,fecha, id]
      );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const eliminarDespacho = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.promise().query("DELETE FROM despacho WHERE uid = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
