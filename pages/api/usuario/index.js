import { pool } from "@/config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await adicionarUsuario(req, res);
    default:
      return await obtenerTodosUsuarios(req, res);
  }
}

const obtenerTodosUsuarios = async (req, res) => {
  try {
    const [result] = await pool
      .promise()
      .query(
        "SELECT u.uid as id, u.nombre, u.usuario, u.correo, u.rol, u.activo, e.nombre as entidad FROM usuario u INNER  JOIN entidad e ON u.entidad = e.uid ORDER BY u.usuario ASC"
      );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const adicionarUsuario = async (req, res) => {
  try {
    const { uid, nombre, usuario, correo, contrasena, entidad, rol, activo } =
      req.body;

    let exist = await contadorXusuario(usuario);
    if (exist[0].cont == 0) {
      const [result] = await pool.promise().query("INSERT INTO usuario SET ?", {
        uid,
        nombre,
        usuario,
        correo,
        contrasena,
        entidad,
        rol,
        activo,
      });
      return res.status(200).json({ nombre });
    }
    return res.status(304).json({ data: "Usuario no disponible" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const contadorXusuario = async (usuario) => {
  try {
    const [result] = await pool
      .promise()
      .query("SELECT COUNT(usuario) as cont FROM usuario WHERE usuario = ?", [
        usuario,
      ]);
    return result;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
