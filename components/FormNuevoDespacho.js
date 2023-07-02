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
  TextField,
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

function FormNuevoDespacho() {
  const router = useRouter();

  const [despacho, setDespacho] = useState({
    uid: uuidv4(),
    cantidad: "",
    combustible: "",
  });

  const [combustibles, setCombustibles] = useState([]);

  const [fecha, setFecha] = useState(new Date());

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ({ target: { name, value } }) => {
    setDespacho({ ...despacho, [name]: value });
  };

  useEffect(() => {
    obtenerCombustibles();
    if (router.query.id) {
      obtenerDespacho();
    }
  }, []);

  const obtenerCombustibles = async () => {
    try {
      const { data } = await axios.get("/api/combustible/");
      setCombustibles(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerDespacho = async () => {
    try {
      const { data } = await axios.get("/api/despacho/" + router.query.id);
      setDespacho(data);
      setFecha(data.fecha)
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query.id) {
        await axios.put(`/api/despacho/${router.query.id}`, {
          despacho,
          fecha,
        });
        toast.success("Se ha editado el despacho");
      } else {
        await axios.post("/api/despacho", { despacho, fecha });
        toast.success("Se ha creado el despacho");
      }
      setTimeout(() => router.push("/despacho"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const eliminarDespacho = async (id) => {
    try {
      await axios.delete(`/api/despacho/${id}`);
      toast.success("Se ha eliminado el despacho");
      setTimeout(() => router.push("/despacho"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Head>
        <title>{router.query.id ? "Editar" : "Nuevo"} despacho</title>
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
              {router.query.id ? "Edite" : "Ingrese"} el despacho
            </Typography>

            <FormControl fullWidth sx={{ mb: "0.5rem" }}>
              <InputLabel id="demo-simple-select-label">
                Tipo de Combustible
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="combustible"
                value={despacho.combustible}
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
              value={despacho.cantidad}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(moment(fecha).utc().format("YYYY-MM-DD"))}
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
              onClick={() => router.push("/despacho")}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={!despacho.cantidad || !despacho.combustible || !fecha }
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
        <DialogTitle>Eliminar despacho</DialogTitle>
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
            onClick={() => eliminarDespacho(despacho.uid)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormNuevoDespacho;
