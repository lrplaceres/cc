import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import Head from "next/head";
import bcrypt from "bcryptjs";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function FormNuevoUsuario() {
  const router = useRouter();

  const [usuario, setUsuario] = useState({
    uid: uuidv4(),
    nombre: "",
    correo: "",
    usuario: "",
    contrasena: "",
    repite: "",
    entidad: "",
    rol: "",
    activo: true,
  });

  const [entidades, setEntidades] = useState([]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = ({ target: { name, value } }) => {
    setUsuario({ ...usuario, [name]: value });
  };

  const handleChecked = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    obtenerEntidades();
  }, []);

  const obtenerEntidades = async () => {
    try {
      const { data } = await axios.get("/api/entidad");
      setEntidades(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var { data: cont } = await axios.get(
        `/api/usuario/existe/${usuario.usuario}`
      );
      if (cont[0].cont) {
        setUsuario({ ...usuario, ["usuario"]: "" });
        return toast.error("Usuario no disponible");
      }

      if (usuario.contrasena != usuario.repite) {
        setUsuario({ ...usuario, ["contrasena"]: "" });
        return toast.error("Las contraseñas deben coincidir");
      }

      if (
        usuario.contrasena == usuario.nombre ||
        usuario.contrasena == usuario.usuario ||
        usuario.contrasena == usuario.correo
      ) {
        setUsuario({ ...usuario, ["contrasena"]: "" });
        return toast.error(
          "La contraseña no debe coincidir con su nombre, usuario o correo"
        );
      }
      usuario.contrasena = bcrypt.hashSync(
        usuario.contrasena,
        "$2a$10$CwTysUXWue0Thq9StjUK0u"
      );
      const res = await axios.post("/api/usuario", usuario);
      toast.success("Se ha creado el usuario");
      setTimeout(() => router.push("/usuario"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Head>
        <title>Nuevo usuario</title>
      </Head>
      <Container maxWidth="sm">
        <Card sx={{ p: "1rem" }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" color="primary" align="center" mb={2}>
              {router.query.id ? "EDITE" : "INGRESE"} EL USUARIO
            </Typography>

            <TextField
              id="nombre"
              label="Nombre"
              onChange={handleChange}
              name="nombre"
              minLength={3}
              maxLength={35}
              required
              fullWidth
              sx={{ mb: ".5rem" }}
            />

            <TextField
              id="username"
              label="Usuario o Teléfono"
              onChange={handleChange}
              name="usuario"
              minLength={3}
              maxLength={35}
              required
              fullWidth
              value={usuario.usuario}
              sx={{ mb: ".5rem" }}
            />

            <TextField
              id="correo"
              label="Correo electrónico"
              onChange={handleChange}
              name="correo"
              type="email"
              minLength={3}
              maxLength={35}
              required
              fullWidth
              sx={{ mb: ".5rem" }}
            />
            <TextField
              id="contrasena"
              label="Constraseña"
              onChange={handleChange}
              name="contrasena"
              minLength={6}
              maxLength={35}
              autoComplete="off"
              required
              fullWidth
              value={usuario.contrasena}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: ".5rem" }}
            />
            <TextField
              id="repite"
              label="Verifique Constraseña"
              onChange={handleChange}
              name="repite"
              minLength={6}
              maxLength={35}
              autoComplete="off"
              required
              fullWidth
              value={usuario.contrasena ? usuario.repite : ""}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: ".5rem" }}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Entidad</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="entidad"
                value={usuario.entidad}
                label="Entidad"
                onChange={handleChange}
                sx={{ mb: ".5rem" }}
              >
                {entidades.map((ent, index) => (
                  <MenuItem key={index.toString()} value={ent.id}>
                    {ent.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="role-label">Rol</InputLabel>
              <Select
                labelId="role-label"
                id="rol"
                value={usuario.rol}
                label="Rol"
                onChange={handleChange}
                name="rol"
                sx={{ mb: ".5rem" }}
              >
                <MenuItem value="usuario">Usuario</MenuItem>
                <MenuItem value="administrador">Administrador</MenuItem>
                <MenuItem value="superadmin">Superadmin</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={<Checkbox value={usuario.activo} />}
              label="Activo"
              name="activo"
              onChange={handleChecked}
              checked={usuario.activo}
            />

            <br />

            <Button
              variant="contained"
              color="inherit"
              type="reset"
              startIcon={<CancelIcon />}
              sx={{ mr: "0.5rem" }}
              onClick={() => router.push("/usuario")}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={
                !usuario.nombre ||
                !usuario.usuario ||
                !usuario.correo ||
                !usuario.contrasena ||
                !usuario.repite ||
                usuario.contrasena != usuario.repite ||
                !usuario.entidad ||
                !usuario.rol
              }
              startIcon={<DoneIcon />}
            >
              Aceptar
            </Button>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default FormNuevoUsuario;
