import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import {
  Button,
  Card,
  Container,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function VistaTablero() {
  const [anno, setAnno] = useState();

  const [mes, setMes] = useState();

  const [combustibles, setCombustibles] = useState([]);

  const [entidades, setEntidades] = useState([]);

  useEffect(() => {
    obtenerCombustibles();
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

  const obtenerCombustibles = async () => {
    try {
      const { data } = await axios.get("/api/combustible/");
      setCombustibles(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Card sx={{ flexGrow: 1,p:"1rem"}}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                label={"Seleccionar mes"}
                views={["year", "month"]}
                openTo="year"
                minDate={dayjs("2023-07-01")}
                maxDate={dayjs("2026-12-12")}
                /*onChange={(newValue) => {
                  buscarDistribucionMes(newValue.year(), newValue.month() + 1);
                  setAnno(newValue.year());
                  setMes(newValue.month() + 1);
                }}*/
                sx={{display:"flex"}}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo de Combustible
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="combustible"
                label="Tipo de Combustible"
                //onChange={handleChange}
                //required
              >
                {combustibles.map((comb, index) => (
                  <MenuItem key={index.toString()} value={comb.id}>
                    {comb.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Entidad</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                name="entidad"
                //value={usuario.entidad}
                label="Entidad"
                //onChange={handleChange}
                sx={{ mb: ".5rem" }}
              >
                {entidades.map((ent, index) => (
                  <MenuItem key={index.toString()} value={ent.id}>
                    {ent.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Entidad</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                name="entidad"
                //value={usuario.entidad}
                label="Entidad"
                //onChange={handleChange}
                sx={{ mb: ".5rem" }}
              >
                {entidades.map((ent, index) => (
                  <MenuItem key={index.toString()} value={ent.id}>
                    {ent.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
   
    </>
  );
}

export default VistaTablero;
