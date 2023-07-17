import { pool } from "@/config/db";
import moment from "moment";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(403).json({ message: "Por favor, contacte al administrador" });
    return;
  }

  switch (req.method) {
    case "DELETE":
      return await eliminarAutorizo(req, res);
    case "PUT":
      return await actualizarAutorizo(req, res);
    default:
      return await obtenerAutorizo(req, res);
  }
}

const obtenerAutorizo = async (req, res) => {
  try {
    const { id } = req.query;
    const [result] = await pool
      .promise()
      .query("SELECT * FROM autorizo  WHERE uid = ?", [id]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const actualizarAutorizo = async (req, res) => {
  const { id } = req.query;
  var { fecha } = req.body;
  var fecha2 = moment(fecha).utc().format("YYYY-MM-DD");
  fecha = fecha2;
  const { combustible, cantidad, entidad } = req.body.asignacion;
  try {
    await pool
      .promise()
      .query(
        "UPDATE autorizo SET combustible = ?, cantidad = ?,entidad = ?, fecha = ? WHERE uid = ?",
        [combustible, cantidad, entidad, fecha, id]
      );
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const eliminarAutorizo = async (req, res) => {
  try {
    const { id } = req.query;
    await pool.promise().query("DELETE FROM autorizo WHERE uid = ?", [id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
