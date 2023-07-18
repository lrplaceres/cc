import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import {
  Box,
  Card,
  Fab,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SwipeableDrawer,
  Typography,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import { useSession } from "next-auth/react";
import { DataGrid, esES } from "@mui/x-data-grid";
import GraficoCombustiblesAutorizados from "./GraficoCombustiblesAutorizados";
import GraficosCombustiblesRedistribuidos from "./GraficosCombustiblesRedistribuidos";
import GraficosCombustiblesDistribuidos from "./GraficosCombustiblesDistribuidos";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CancelIcon from "@mui/icons-material/Cancel";

function VistaTablero({ entidadDefault }) {
  const { data: session, status } = useSession();

  const [anno, setAnno] = useState(dayjs().year());

  const [mes, setMes] = useState(dayjs().month() + 1);

  const [filtroEntidad, setFiltroEntidad] = useState("");

  const [entidades, setEntidades] = useState([]);

  const [autorizos, setAutorizos] = useState([]);

  const [distribucion, setDistribucion] = useState([]);

  const [redistribuciones, setRedistribuciones] = useState([]);

  useEffect(() => {
    obtenerEntidadesSubordinadas(entidadDefault);
    buscarAutorizosFecha(anno, mes, entidadDefault);
    buscarDistribucionFecha(anno, mes, entidadDefault);
    buscarRedistribucionesFecha(anno, mes, entidadDefault);
  }, []);

  const obtenerEntidadesSubordinadas = async (identidad) => {
    try {
      const { data } = await axios.post(`/api/entidad/subordinados/`, {
        identidad,
      });
      setEntidades(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const buscarAutorizosFecha = async (
    anno,
    mes,
    identidad = session?.identidad
  ) => {
    try {
      const { data } = await axios.post(
        "/api/distribucion/buscarAutorizosMes",
        {
          identidad,
          anno,
          mes,
        }
      );
      setAutorizos(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const buscarRedistribucionesFecha = async (
    anno,
    mes,
    identidad = session?.identidad
  ) => {
    try {
      const { data } = await axios.post(
        "/api/distribucion/buscarDistribucionEstadisticaEntidadesSubordinadas",
        {
          identidad,
          anno,
          mes,
        }
      );
      setRedistribuciones(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const buscarDistribucionFecha = async (
    anno,
    mes,
    identidad = session?.identidad
  ) => {
    try {
      const { data } = await axios.post(
        "/api/distribucion/buscarDistribucionEstadisticaaEntidad",
        {
          identidad,
          anno,
          mes,
        }
      );
      setDistribucion(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const columnsAutorizos = [
    {
      field: "nombre",
      headerName: "Combustible",
      width: 160,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      width: 140,
    },
  ];

  const columnsDistribuido = [
    {
      field: "nombre",
      headerName: "Combustible",
      width: 160,
    },
    {
      field: "distribuido",
      headerName: "Cantidad",
      width: 140,
    },
  ];

  const columnsRedistribuciones = [
    {
      field: "nombre",
      headerName: "Combustible",
      width: 160,
    },
    {
      field: "midistribucion",
      headerName: "Cantidad",
      width: 140,
    },
  ];

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <div>
        <Fab
          color="warning"
          variant="circular"
          aria-label="icono_filtro"
          onClick={toggleDrawer("right", true)}
          sx={{ position: "fixed", top: 70, right: 16 }}
        >
          <FilterAltIcon />
        </Fab>
        <SwipeableDrawer
          sx={{ pt: 10, px: 1 }}
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          <Box
            sx={{
              width: 250,
              pt: 1,
              px: 1,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                defaultValue={dayjs(new Date())}
                label={"Seleccionar mes"}
                views={["year", "month"]}
                openTo="year"
                minDate={dayjs("2023-07-01")}
                maxDate={dayjs("2026-12-12")}
                onChange={(newValue) => {
                  {
                    filtroEntidad
                      ? buscarAutorizosFecha(
                          newValue.year(),
                          newValue.month() + 1,
                          filtroEntidad
                        )
                      : buscarAutorizosFecha(
                          newValue.year(),
                          newValue.month() + 1
                        );
                  }

                  {
                    filtroEntidad
                      ? buscarRedistribucionesFecha(
                          newValue.year(),
                          newValue.month() + 1,
                          filtroEntidad
                        )
                      : buscarRedistribucionesFecha(
                          newValue.year(),
                          newValue.month() + 1
                        );
                  }

                  {
                    filtroEntidad
                      ? buscarDistribucionFecha(
                          newValue.year(),
                          newValue.month() + 1,
                          filtroEntidad
                        )
                      : buscarDistribucionFecha(
                          newValue.year(),
                          newValue.month() + 1
                        );
                  }
                  setAnno(newValue.year());
                  setMes(newValue.month() + 1);
                }}
                sx={{ display: "flex" }}
              />
            </LocalizationProvider>

            <TextField
              select
              labelId="demo-simple-select-label"
              id="demo-simple-select1"
              name="entidad"
              label="Entidades"
              fullWidth
              onChange={(e) => {
                setFiltroEntidad(e.target.value);
                buscarAutorizosFecha(anno, mes, e.target.value);
                buscarDistribucionFecha(anno, mes, e.target.value);
                buscarRedistribucionesFecha(anno, mes, e.target.value);
              }}
              sx={{ mt: ".5rem", mb: ".5rem" }}
              value={filtroEntidad}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CancelIcon
                      onClick={() => {
                        setFiltroEntidad("");
                        buscarAutorizosFecha(anno, mes, entidadDefault);
                        buscarDistribucionFecha(anno, mes, entidadDefault);
                        buscarRedistribucionesFecha(anno, mes, entidadDefault);
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            >
              {entidades.map((ent, index) => (
                <MenuItem key={index.toString()} value={ent.uid}>
                  {ent.nombre}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </SwipeableDrawer>
      </div>

      <Grid container spacing={1}>
        {!!autorizos.length && (
          <>
            <Grid item xs={12} md={6}>
              <GraficoCombustiblesAutorizados autorizos={autorizos} />
            </Grid>
          </>
        )}
        {!!distribucion.length && (
          <>
            <Grid item xs={12} md={6}>
              <GraficosCombustiblesDistribuidos distribucion={distribucion} />
            </Grid>
          </>
        )}

        {!!redistribuciones.length && (
          <>
            <Grid item xs={12} md={6}>
              <GraficosCombustiblesRedistribuidos
                redistribuciones={redistribuciones}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Grid container spacing={1}>
        {!!autorizos.length && (
          <>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: "1rem", mb: ".5rem" }}>
                <Typography variant="h6" color="primary" align="center" mb={2}>
                  AUTORIZOS
                </Typography>
                <DataGrid
                  localeText={
                    esES.components.MuiDataGrid.defaultProps.localeText
                  }
                  rows={autorizos}
                  columns={columnsAutorizos}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 25,
                      },
                    },
                  }}
                  pageSizeOptions={[25]}
                  getRowId={(row) => row.nombre}
                />
              </Card>
            </Grid>
          </>
        )}

        {!!distribucion.length && (
          <>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: "1rem", mb: ".5rem" }}>
                <Typography variant="h6" color="primary" align="center" mb={2}>
                  DISTRIBUIDO
                </Typography>
                <DataGrid
                  localeText={
                    esES.components.MuiDataGrid.defaultProps.localeText
                  }
                  rows={distribucion}
                  columns={columnsDistribuido}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 25,
                      },
                    },
                  }}
                  pageSizeOptions={[25]}
                  getRowId={(row) => row.nombre}
                />
              </Card>
            </Grid>
          </>
        )}

        {!!redistribuciones.length && (
          <>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: "1rem", mb: ".5rem" }}>
                <Typography variant="h6" color="primary" align="center" mb={2}>
                  REDISTRIBUIDO
                </Typography>
                <DataGrid
                  localeText={
                    esES.components.MuiDataGrid.defaultProps.localeText
                  }
                  rows={redistribuciones}
                  columns={columnsRedistribuciones}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 25,
                      },
                    },
                  }}
                  pageSizeOptions={[25]}
                  getRowId={(row) => row.nombre}
                />
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

export default VistaTablero;
