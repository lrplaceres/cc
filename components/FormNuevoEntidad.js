import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Head from "next/head";
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
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

function FormNuevoEntidad() {
  const router = useRouter();

  const [entidad, setEntidad] = useState({
    uid: uuidv4(),
    nombre: "",
    subordinado: "",
    subordinacion: 0,
  });

  const [entidades, setEntidades] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setEntidad({ ...entidad, [name]: value });
  };

  const handleChecked = (event) => {
    setEntidad({
      ...entidad,
      [event.target.name]: event.target.checked,
    });
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    obtenerEntidades();
    if (router.query.id) {
      obtenerEntidad();
    }
  }, []);

  const obtenerEntidad = async () => {
    try {
      const { data } = await axios.get(`/api/entidad/${router.query.id}`);
      setEntidad(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerEntidades = async () => {
    try {
      const { data } = await axios.get("/api/entidad/sinsubordinacion");
      setEntidades(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query.id) {
        await axios.put(`/api/entidad/${router.query.id}`, entidad);
        toast.success("Se ha editado la entidad");
      } else {
        await axios.post("/api/entidad", entidad);
        toast.success("Se ha creado la entidad");
      }
      setTimeout(() => router.push("/entidad"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const eliminarEntidad = async (id) => {
    try {
      await axios.delete(`/api/entidad/${id}`);
      toast.success("Se ha eliminado la entidad");
      setTimeout(() => router.push("/entidad"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Head>
        <title>{router.query.id ? "Editar" : "Nueva"} entidad</title>
      </Head>
      <Container maxWidth="sm">
        <Card sx={{ p: "1rem" }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" color="primary" align="center" mb={2}>
              {router.query.id ? "EDITE" : "INGRESE"} LA ENTIDAD
            </Typography>

            <TextField
              id="nombre"
              label="Nombre"
              onChange={handleChange}
              type="text"
              name="nombre"
              required
              fullWidth
              sx={{ mb: "0.5rem" }}
              value={entidad.nombre}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Subordinado</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="subordinado"
                value={entidad.subordinado}
                label="Subordinado"
                onChange={handleChange}
              >
                {entidades.map((ent, index) => (
                  <MenuItem key={index.toString()} value={ent.id}>
                    {ent.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={<Checkbox value={entidad.subordinacion} />}
              label="Subordinación"
              name="subordinacion"
              onChange={handleChecked}
              checked={entidad.subordinacion}
            />

            <br />

            <Button
              variant="contained"
              color="inherit"
              type="reset"
              startIcon={<CancelIcon />}
              sx={{ mr: "0.5rem" }}
              onClick={() => router.push("/despacho")}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              //disabled={!despacho.cantidad || !despacho.combustible || !fecha}
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
            >
              Eliminar
            </Button>
          </Card>
        )}
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle>Eliminar entidad</DialogTitle>
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
            onClick={() => eliminarEntidad(entidad.uid)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormNuevoEntidad;
