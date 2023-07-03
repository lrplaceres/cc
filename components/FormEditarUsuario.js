import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import DeleteIcon from "@mui/icons-material/Delete";
import Head from "next/head";
import KeyIcon from "@mui/icons-material/Key";
import bcrypt from "bcryptjs";

function FormEditarUsuario() {
  const router = useRouter();

  const [usuario, setUsuario] = useState({
    uid: uuidv4(),
    usuario: "",
    nombre: "",
    correo: "",
    repite: "",
    entidad: "",
    rol: "",
    activo: 1,
  });

  const [contrasena, setContrasena] = useState("");

  const [entidades, setEntidades] = useState([]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
    setContrasena("");
  };
  const handleClose2 = () => {
    setOpen2(false);
    setContrasena("");
  };

  const handleChange = ({ target: { name, value } }) => {
    setUsuario({ ...usuario, [name]: value });
  };

  const handleChecked = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeContrasena = ({ target: { value } }) => {
    setContrasena(value);
  };

  useEffect(() => {
    obtenerEntidades();
    if (router.query.id) {
      obtenerUsuario();
    }
  }, []);

  const obtenerUsuario = async () => {
    try {
      const { data } = await axios.get(`/api/usuario/${router.query.id}`);
      setUsuario(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

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
      const res = await axios.put(`/api/usuario/${router.query.id}`, usuario);
      toast.success("Se ha creado el usuario");
      setTimeout(() => router.push("/usuario"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`/api/usuario/${id}`);
      toast.success("Se ha eliminado el usuario");
      setTimeout(() => router.push("/usuario"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const cambiarContrasena = async (id) => {
    try {
      if (!contrasena) {
        return toast.error("Introduzca una contraseña");
      }
      await axios.post(`/api/usuario/${id}`, {
        contrasena: bcrypt.hashSync(
          contrasena,
          "$2a$10$CwTysUXWue0Thq9StjUK0u"
        ),
      });
      handleClose2();
      toast.success("Se ha cambiado la contraseña");
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
            <Typography
              variant="overline"
              color="initial"
              align="center"
              component="p"
            >
              {router.query.id ? "Edite" : "Ingrese"} el usuario
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
              value={usuario.nombre}
              sx={{ mb: ".5rem" }}
            />

            <TextField
              id="username"
              label="Usuario o Teléfono"
              name="usuario"
              disabled
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
              value={usuario.correo}
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
                !usuario.entidad ||
                !usuario.rol
              }
              startIcon={<DoneIcon />}
            >
              Aceptar
            </Button>
          </form>
        </Card>

        {router.query.id && (
          <Card sx={{ textAlign: "center", mt: "1.5rem", p: "1rem" }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleClickOpen}
              sx={{ mr: "1rem" }}
            >
              Eliminar
            </Button>

            <Button
              variant="contained"
              color="warning"
              onClick={handleClickOpen2}
              startIcon={<KeyIcon />}
            >
              Cambiar Contraseña
            </Button>
          </Card>
        )}
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle>Eliminar usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Al confirmar esta acción <strong>se borrarán los datos</strong>{" "}
            relacionados.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => eliminarUsuario(usuario.uid)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title2"
      >
        <DialogTitle>Cambiar contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            id="npassw"
            label="Nueva contraseña"
            onChange={handleChangeContrasena}
            sx={{ mt: "1rem" }}
            type="password"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose2}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => cambiarContrasena(usuario.uid)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormEditarUsuario;
