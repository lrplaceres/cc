import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import moment from "moment";
import {
  Alert,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import { useSession } from "next-auth/react";
import { DataGrid } from "@mui/x-data-grid";

function VistaTablero() {
  const { data: session, status } = useSession();

  const [anno, setAnno] = useState();

  const [mes, setMes] = useState();

  const [combustibles, setCombustibles] = useState([]);

  const [entidades, setEntidades] = useState([]);

  const [asignacionGeneral, setAsignacionGeneral] = useState([]);

  const [asignacionDetallada, setAsignacionDetallada] = useState([]);

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

  const buscarxFiltroFecha = async (anno, mes) => {
    try {
      var identidad = session?.identidad;
      const { data } = await axios.post("/api/asignacion/xMesxEntidad", {
        identidad,
        anno,
        mes,
      });
      setAsignacionGeneral(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const buscarxCombustible = async (combustible) => {
    try {
      var identidad = session?.identidad;
      const { data } = await axios.post(
        "/api/asignacion/xMesxEntidadNoAgrupado",
        {
          identidad,
          anno,
          mes,
          combustible,
        }
      );
      setAsignacionDetallada(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const columns = [
    {
      field: "nombre",
      headerName: "Combustible",
      width: 150,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
    },
    {
      field: "fecha",
      headerName: "Fecha",
      renderCell: (params) => (
        <>{moment(params.row.fecha).utc().format("YYYY-MM-DD")}</>
      ),
    },
  ];

  return (
    <>
      <Card sx={{ p: "1rem", mb: ".5rem" }}>
        <Grid container spacing={1}>
          <Grid item xs>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                label={"Seleccionar mes"}
                views={["year", "month"]}
                openTo="year"
                minDate={dayjs("2023-07-01")}
                maxDate={dayjs("2026-12-12")}
                onChange={(newValue) => {
                  buscarxFiltroFecha(newValue.year(), newValue.month() + 1);
                  setAnno(newValue.year());
                  setMes(newValue.month() + 1);
                  setAsignacionDetallada([]);
                }}
                sx={{ display: "flex" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs>
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
              >
                <MenuItem value="" selected>
                  <em>None</em>
                </MenuItem>
                {combustibles.map((comb, index) => (
                  <MenuItem key={index.toString()} value={comb.id}>
                    {comb.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Entidad</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                name="entidad"
                label="Entidad"
                //onChange={handleChange}
                sx={{ mb: ".5rem" }}
              >
                <MenuItem value="" selected>
                  <em>None</em>
                </MenuItem>
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

      {asignacionGeneral.length === 0 ? (
        <>
          <Stack sx={{ width: "100%", mb: ".5rem" }} spacing={2}>
            <Alert severity="info">Seleccione la fecha</Alert>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs>
              <Skeleton
                animation="pulse"
                variant="rounded"
                width={150}
                height={80}
              />
            </Grid>
            <Grid item xs>
              <Skeleton
                animation="pulse"
                variant="rounded"
                width={150}
                height={80}
              />
            </Grid>
            <Grid item xs>
              <Skeleton
                animation="pulse"
                variant="rounded"
                width={150}
                height={80}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container spacing={2}>
          {asignacionGeneral.map((asignacion, index) => (
            <Grid item xs key={index.toString()}>
              <Card
                sx={{
                  p: "1rem",
                  minHeight: "7rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  mb: ".5rem",
                }}
                onClick={() => buscarxCombustible(asignacion.combustible)}
              >
                <Typography variant="body1" color="primary" align="center">
                  {asignacion.nombre}
                </Typography>
                <Typography variant="h6" color="initial" align="center">
                  {asignacion.asignado}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {asignacionDetallada.length === 0 ? (
        <>
          <Grid container spacing={2} sx={{mt:".5rem"}}>
            <Grid item xs>
              <Skeleton
                animation="pulse"
                variant="rectangular"
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Card sx={{ p: "1rem" }}>
            <Typography variant="h6" color="primary" align="center" mb={2}>
              MIS ASIGNACIONES
            </Typography>
            <DataGrid
              rows={asignacionDetallada}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
            />
          </Card>
        </>
      )}
    </>
  );
}

export default VistaTablero;
