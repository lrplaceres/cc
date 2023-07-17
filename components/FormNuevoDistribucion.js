import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Container,
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
import { DatePicker } from "@mui/x-date-pickers";
import { useSession } from "next-auth/react";

function FormNuevoDistribucion({ entidadDefault }) {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [asignacion, setAsignacion] = useState({
    uid: uuidv4(),
    combustible: "",
    cantidad: "",
    entidad: "",
    prioridad: "",
    observaciones: "",
  });

  const [fecha, setFecha] = useState();

  const [entidades, setEntidades] = useState([]);

  const [autorizado, setAutorizado] = useState([]);

  const [distribucion, setDistribucion] = useState([]);

  const [combustibleTemporal, setCombustibleTemporal] = useState("");

  const [totalDistribuido, setTotalDistribuido] = useState(0);

  const [totalAutorizo, setTotalAutorizo] = useState(0);

  const [totalRedistribuido, setTotalRedistribuido] = useState(0);

  const [anno, setAnno] = useState();

  const [mes, setMes] = useState();

  const [maximoValor, setMaximoValor] = useState(0);

  const handleChange = ({ target: { name, value } }) => {
    setAsignacion({ ...asignacion, [name]: value });
  };

  useEffect(() => {
    obtenerEntidades();
  }, []);

  const buscarCombustiblesAutorizadosMes = async (
    anno,
    mes,
    identidad = session?.identidad
  ) => {
    try {
      const { data } = await axios.post(
        "/api/distribucion/buscarAutorizosMes",
        {
          anno,
          mes,
          identidad,
        }
      );
      setAutorizado(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const buscarCombustiblesDistribuidosMes = async (
    anno,
    mes,
    identidad = session?.identidad
  ) => {
    try {
      const { data } = await axios.post(
        "/api/distribucion/buscarDistribucionEstadisticaaEntidad",
        {
          anno,
          mes,
          identidad,
        }
      );
      setDistribucion(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerEntidades = async (identidad = entidadDefault) => {
    try {
      const { data } = await axios.post(`/api/entidad/subordinados`, {
        identidad,
      });
      setEntidades(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerDistribucionMesCombustibleTotal = async ({
    target: { value },
  }) => {
    try {
      var identidad = session?.identidad;
      const { data } = await axios.post(
        "/api/distribucion/buscarDistribucionEntidadCombustible",
        {
          identidad,
          value,
          mes,
          anno,
        }
      );
      setTotalDistribuido(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerAutorizosMesCombustibleTotal = async ({ target: { value } }) => {
    try {
      var identidad = session?.identidad;
      const { data } = await axios.post(
        "/api/distribucion/buscarAutorizoMesEntidadCombustible",
        {
          identidad,
          value,
          mes,
          anno,
        }
      );
      setTotalAutorizo(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerRedistribuidoMesCombustible = async ({ target: { value } }) => {
    try {
      var identidad = session?.identidad;
      const { data } = await axios.post(
        "/api/distribucion/buscarDistribucionEntidadesSubordinadasCombustible",
        {
          identidad,
          value,
          mes,
          anno,
        }
      );
      setTotalRedistribuido(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query.id) {
        await axios.put(`/api/distribucion/${router.query.id}`, {
          asignacion,
          fecha,
        });
        toast.success("Se ha editado la asignacion");
      } else {
        await axios.post("/api/distribucion", { asignacion, fecha });
        toast.success("Se ha creado la asignacion");
      }
      setTimeout(() => router.push("/distribucion"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Head>
        <title>Nueva Distribución</title>
      </Head>
      <Container maxWidth="sm">
        <Card sx={{ p: "1rem" }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" color="primary" align="center" mb={2}>
              INGRESE LA DISTRIBUCIÓN
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                value={
                  router.query.id
                    ? dayjs(moment(fecha).utc().format("YYYY-MM-DD"))
                    : ""
                }
                onChange={(newValue) => {
                  buscarCombustiblesAutorizadosMes(
                    newValue.year(),
                    newValue.month() + 1
                  );
                  buscarCombustiblesDistribuidosMes(
                    newValue.year(),
                    newValue.month() + 1
                  );
                  setFecha(newValue);
                  setMes(newValue.month() + 1);
                  setAnno(newValue.year());
                  setCombustibleTemporal("");
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
                value={combustibleTemporal}
                label="Tipo de Combustible"
                onChange={(e) => {
                  handleChange(e);
                  setCombustibleTemporal(e.target.value);
                  obtenerRedistribuidoMesCombustible(e);
                  obtenerDistribucionMesCombustibleTotal(e);
                  obtenerAutorizosMesCombustibleTotal(e);
                }}
                required
                //disabled={!autorizado.length}
              >
                {!!autorizado.length
                  ? autorizado.map((comb, index) => (
                      <MenuItem key={index.toString()} value={comb.combustible}>
                        {comb.nombre}
                      </MenuItem>
                    ))
                  : distribucion.map((comb, index) => (
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
              disabled={
                !fecha || !asignacion.combustible || !asignacion.entidad
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!!autorizado.length
                      ? totalAutorizo - totalRedistribuido
                      : totalDistribuido - totalRedistribuido}
                  </InputAdornment>
                ),
                inputProps: { min: 1, max: maximoValor },
              }}
              onSelect={() =>
                setMaximoValor(
                  !!autorizado.length
                    ? totalAutorizo - totalRedistribuido
                    : totalDistribuido - totalRedistribuido
                )
              }
            />

            <TextField
              id="prioridad"
              label="Producto a priorizar"
              name="prioridad"
              required
              fullWidth
              sx={{ mb: ".5rem" }}
              //value={}
              onChange={handleChange}
            />

            <TextField
              id="observaciones"
              label="Observaciones"
              name="observaciones"
              required
              fullWidth
              multiline
              rows={4}
              sx={{ mb: ".5rem" }}
              //value={}
              onChange={handleChange}
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
                !fecha ||
                !asignacion.prioridad ||
                !asignacion.observaciones
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
