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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import "dayjs/locale/es";
import { set } from "nprogress";

function FormNuevoAutorizo() {
  const router = useRouter();

  const [autorizo, setAutorizo] = useState({
    uid: uuidv4(),
    combustible: "",
    cantidad: "",
    entidad: "",
  });

  const [fecha, setFecha] = useState();

  const [combustibles, setCombustibles] = useState([]);

  const [combustibleTemporal, setCombustibleTemporal] = useState("");

  const [entidadTemporal, setEntidadTemporal] = useState("");

  const [entidades, setEntidades] = useState([]);

  const [autorizado, setAutorizado] = useState(0);

  const [despacho, setDespacho] = useState(0);

  const handleChange = ({ target: { name, value } }) => {
    setAutorizo({ ...autorizo, [name]: value });
  };

  useEffect(() => {
    obtenerEntidades();
  }, []);

  const obtenerCombustiblesXdia = async (dia) => {
    try {
      const { data } = await axios.post("/api/despacho/xdia", { dia });
      setCombustibles(data);
      setAutorizo({ ...autorizo, ["combustible"]: "" });
      setDespacho(0);
      setAutorizado(0);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerCombustibleAutorizadoXdia = async (value) => {
    try {
      const { data } = await axios.post("/api/autorizo/xfechaxcombustible", {
        fecha,
        value,
      });
      setAutorizado(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const obtenerCombustibleDespachoXdia = async (value) => {
    try {
      const { data } = await axios.post("/api/despacho/sumaxdiaxfecha", {
        fecha,
        value,
      });
      setDespacho(data);
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
      await axios.post("/api/autorizo", { autorizo, fecha });
      toast.success("Se ha creado el autorizo");
      setTimeout(() => router.push("/autorizo"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Head>
        <title>Nuevo autorizo</title>
      </Head>
      <Container maxWidth="sm">
        <Card sx={{ p: "1rem" }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" color="primary" align="center" mb={2}>
              INGRESE EL AUTORIZO
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                onChange={(newValue) => {
                  setFecha(newValue);
                  obtenerCombustiblesXdia(newValue);
                  setCombustibleTemporal("");
                }}
                format="YYYY-MM-DD"
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
                label="Tipo de Combustible"
                onChange={(e) => {
                  handleChange(e);
                  obtenerCombustibleAutorizadoXdia(e.target.value);
                  obtenerCombustibleDespachoXdia(e.target.value);
                  setCombustibleTemporal(e.target.value);
                }}
                required
                disabled={!combustibles.length}
                value={combustibleTemporal}
              >
                {combustibles.map((comb, index) => (
                  <MenuItem
                    key={index.toString()}
                    value={comb.id}
                  >
                    {comb.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">Entidad</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                name="entidad"
                label="Entidad"
                onChange={(e) => {
                  handleChange(e);
                  setEntidadTemporal(e.target.value);
                }}
                sx={{ mb: ".5rem" }}
                value={entidadTemporal}
              >
                
                {entidades.map((ent, index) => (
                  <MenuItem key={index.toString()} value={ent.id}>
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
              disabled={
                !combustibles.length ||
                !autorizo.combustible ||
                despacho - autorizado == 0
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {despacho - autorizado}
                  </InputAdornment>
                ),
                inputProps: {
                  min: 1,
                  max: despacho - autorizado,
                },
              }}
            />

            <Button
              variant="contained"
              color="inherit"
              type="reset"
              startIcon={<CancelIcon />}
              sx={{ mr: ".5rem" }}
              onClick={() => router.push("/autorizo")}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={
                !autorizo.cantidad ||
                !autorizo.combustible ||
                !autorizo.entidad ||
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

export default FormNuevoAutorizo;
