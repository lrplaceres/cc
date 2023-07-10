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
  InputAdornment,
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
import moment from "moment";
import "dayjs/locale/es";
import { DateCalendar, DatePicker } from "@mui/x-date-pickers";
import { useSession } from "next-auth/react";

function FormNuevoDistribucion() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [asignacion, setAsignacion] = useState({
    uid: uuidv4(),
    combustible: "",
    cantidad: "",
    entidad: "",
  });

  const [fecha, setFecha] = useState();

  const [entidades, setEntidades] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setAsignacion({ ...asignacion, [name]: value });
  };

  const [asignado, setAsignado] = useState([]);

  const [anno, setAnno] = useState();

  const [mes, setMes] = useState();

  const [total, setTotal] = useState(0);

  const [distribuido, setDistribuido] = useState(0);

  useEffect(() => {
    obtenerEntidades();
  }, []);

  const buscarAsignacionesMes = async (anno, mes) => {
    try {
      var identidad = session?.identidad;
      const { data } = await axios.post("/api/asignacion/buscarAsignadoMes", {
        anno,
        mes,
        identidad,
      });
      setAsignado(data);
      obtenerEntidades();
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerEntidades = async () => {
    try {
      var identidad = session?.identidad;
      const { data } = await axios.post(`/api/entidad/subordinados`, {
        identidad,
      });
      setEntidades(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerCombustibleTotalXmes = async ({ target: { value } }) => {
    try {
      var identidad = session?.identidad;
      const { data } = await axios.post("/api/asignacion/xMesxCombustiblexEntidad", {
        identidad,
        value,
        mes,
        anno
      });
      setTotal(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  }; 
  
  const obtenerCombustibleDistribuidoXmes = async ({ target: { value } }) => {
    try {
      var identidad = session?.identidad;
      const { data } = await axios.post("/api/asignacion/xMesxCombustiblexEntidadesSubordinadas", {
        identidad,
        value,
        mes,
        anno
      });
      setDistribuido(data);
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
      setTimeout(() => router.push("/distribucion"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ p: "1rem" }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" color="primary" align="center" mb={2}>
              {router.query.id ? "EDITE" : "INGRESE"} LA DISTRIBUCIÓN
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                value={
                  router.query.id
                    ? dayjs(moment(fecha).utc().format("YYYY-MM-DD"))
                    : ""
                }
                onChange={(newValue) => {
                  setFecha(newValue);
                  buscarAsignacionesMes(newValue.year(), newValue.month() + 1);
                  setMes(newValue.month() + 1);
                  setAnno(newValue.year());
                }}
                format="YYYY-MM-DD"
                minDate={dayjs("2023-07-01")}
                maxDate={dayjs("2025-12-12")}
                sx={{ mb: ".5rem" }}
              />
            </LocalizationProvider>

            <FormControl fullWidth sx={{ mb: ".5rem" }}>
              <InputLabel id="demo-simple-select-label">
                Tipo de Combustible
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="combustible"
                value={asignacion.combustible}
                label="Tipo de Combustible"
                onChange={(e) => {
                  handleChange(e);
                  obtenerCombustibleTotalXmes(e);
                  obtenerCombustibleDistribuidoXmes(e)
                }}
                required
                readOnly={!asignado.length}
                disabled={!asignado.length}
              >
                {asignado.map((comb, index) => (
                  <MenuItem key={index.toString()} value={comb.combustible}>
                    {comb.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <br />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Entidad</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                name="entidad"
                value={asignacion.entidad}
                label="Entidad"
                onChange={handleChange}
                sx={{ mb: ".5rem" }}
              >
                {entidades.map((ent, index) => (
                  <MenuItem key={index.toString()} value={ent.uid}>
                    {ent.nombre}
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
              sx={{ mb: ".5rem" }}
              value={asignacion.cantidad}
               readOnly={!asignado.length || !asignacion.combustible}
              disabled={!asignado.length || !asignacion.combustible}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {total-distribuido}
                  </InputAdornment>
                ),
                inputProps: { min: 1, max: total-distribuido },
              }}
            />

            <Button
              variant="contained"
              color="inherit"
              type="reset"
              startIcon={<CancelIcon />}
              sx={{ mr: ".5rem" }}
              onClick={() => router.push("/distribucion")}
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

      </Container>
    </>
  );
}

export default FormNuevoDistribucion;
