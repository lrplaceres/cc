import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
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
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

function FormNuevoAsignacion() {
  const router = useRouter();

  const [asignacion, setAsignacion] = useState({
    uid: uuidv4(),
    combustible: "",
    cantidad: "",
    entidad: "",
  });

  const [fecha, setFecha] = useState(new Date());

  const [combustibles, setCombustibles] = useState([]);

  const [entidades, setEntidades] = useState([]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ({ target: { name, value } }) => {
    setAsignacion({ ...asignacion, [name]: value });
  };

  useEffect(() => {
    obtenerCombustibles();
    obtenerEntidades();
    if (router.query.id) {
      obtenerEntidad();
    }
  }, []);

  const obtenerEntidad = async () => {
    try {
      const { data } = await axios.get("/api/asignacion/" + router.query.id);
      setAsignacion(data);
      setFecha(data.fecha);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerCombustibles = async () => {
    try {
      const { data } = await axios.get("/api/combustible/");
      setCombustibles(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerEntidades = async () => {
    try {
      const { data } = await axios.get("/api/entidad/");
      setEntidades(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query.id) {
        await axios.put(`/api/asignacion/${router.query.id}`, {
          asignacion,
          fecha,
        });
        toast.success("Se ha editado la asignacion");
      } else {
        await axios.post("/api/asignacion", { asignacion, fecha });
        toast.success("Se ha creado la asignacion");
      }
      setTimeout(() => router.push("/asignacion"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const eliminarAsignacion = async (id) => {
    try {
      await axios.delete(`/api/asignacion/${id}`);
      toast.success("Se ha eliminado la asignacion");
      setTimeout(() => router.push("/asignacion"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Head>
        <title>{router.query.id ? "Editar" : "Nueva"} asignación</title>
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
              {router.query.id ? "Edite" : "Ingrese"} la asignación
            </Typography>
            <FormControl fullWidth sx={{ mb: "0.5rem" }}>
              <InputLabel id="demo-simple-select-label">
                Tipo de Combustible
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="combustible"
                value={asignacion.combustible}
                label="Tipo de Combustible"
                onChange={handleChange}
                required
              >
                {combustibles.map((comb, index) => (
                  <MenuItem key={index.toString()} value={comb.id}>
                    {comb.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="cantidad"
              label="Cantidad"
              onChange={handleChange}
              type="number"
              name="cantidad"
              required
              fullWidth
              sx={{ mb: "0.5rem" }}
              value={asignacion.cantidad}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Entidad</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                name="entidad"
                value={asignacion.entidad}
                label="Entidad"
                onChange={handleChange}
                sx={{ mb: "0.5rem" }}
              >
                {entidades.map((ent, index) => (
                  <MenuItem key={index.toString()} value={ent.id}>
                    {ent.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(
                  moment(asignacion.fecha).utc().format("YYYY-MM-DD")
                )}
                onChange={(newValue) => setFecha(newValue)}
                format="YYYY-MM-DD"
                sx={{ mb: ".5rem" }}
              />
            </LocalizationProvider>

            <br />

            <Button
              variant="contained"
              color="inherit"
              type="reset"
              startIcon={<CancelIcon />}
              sx={{ mr: "0.5rem" }}
              onClick={() => router.push("/asignacion")}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={
                !asignacion.cantidad ||
                !asignacion.combustible ||
                !asignacion.entidad ||
                !fecha
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
        <DialogTitle>Eliminar asignación</DialogTitle>
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
            onClick={() => eliminarAsignacion(asignacion.uid)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormNuevoAsignacion;
