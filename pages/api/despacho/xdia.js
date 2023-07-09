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
    case "POST":
      return await combustiblesXdia(req, res);
    default:
      return ;
  }
}

const combustiblesXdia = async (req, res) => {
  var { dia } = req.body;
  var fecha2 = moment(dia).utc().format("YYYY-MM-DD");
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT d.combustible as id, c.nombre FROM despacho d INNER JOIN combustible c ON d.combustible = c.uid WHERE d.fecha = ? GROUP BY id ORDER BY c.nombre ASC",
        [fecha2]
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
