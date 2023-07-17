import MiniDrawer from "@/components/drawer";
import dayjs, { isDayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/es";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import axios from "axios";
import { DataGrid, esES } from "@mui/x-data-grid";
import {
  Alert,
  Card,
  Container,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { DatePicker } from "@mui/x-date-pickers";
import Head from "next/head";

function index({ entidadDefault }) {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [autorizado, setAutorizado] = useState([]);

  const [redistribucion, setRedistribucion] = useState([]);

  const [distribuido, setRedistribuido] = useState([]);

  const [anno, setAnno] = useState(dayjs().year());

  const [mes, setMes] = useState(dayjs().month() + 1);

  useEffect(() => {
    buscarAutorizosMes(anno, mes, entidadDefault);
    buscarRedistribucionMes(anno, mes, entidadDefault);
    buscarDistribuidoMes(anno, mes, entidadDefault);
  }, []);

  const restante = (params) => {
    return `${
      Number.parseInt(params.row.cantidad) -
      Number.parseInt(params.row.distribuido)
    }`;
  };

  const columns = [
    {
      field: "nombre",
      headerName: "Combustible",
      width: 160,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
    },
    {
      field: "distribuido",
      headerName: "Redistribuido",
    },
    {
      field: "restante",
      headerName: "Restante",
      valueGetter: restante,
    },
  ];

  const columns2 = [
    {
      field: "nombre",
      headerName: "Combustible",
      width: 160,
    },
    {
      field: "midistribucion",
      headerName: "Redistribuido",
    },
  ];

  const columns3 = [
    {
      field: "nombre",
      headerName: "Combustible",
      width: 160,
    },
    {
      field: "distribuido",
      headerName: "Distribuido",
    },
  ];

  const buscarAutorizosMes = async (
    anno,
    mes,
    identidad = session?.identidad
  ) => {
    try {
      const { data } = await axios.post(
        "/api/distribucion/buscarAutorizosMesEntidad",
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

  const buscarRedistribucionMes = async (
    anno,
    mes,
    identidad = session?.identidad
  ) => {
    try {
      const { data } = await axios.post(
        "/api/distribucion/buscarDistribucionEstadisticaEntidadesSubordinadas",
        {
          anno,
          mes,
          identidad,
        }
      );
      setRedistribucion(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const buscarDistribuidoMes = async (
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
      setRedistribuido(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Head>
        <title>Distribución estadístico</title>
      </Head>
      <MiniDrawer>
        <Container maxWidth="sm">
          <Card
            sx={{
              p: "1rem",
              mb: ".5rem",
              display: "flex",
              justifyContent: "center",
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
                  buscarAutorizosMes(newValue.year(), newValue.month() + 1);
                  buscarRedistribucionMes(
                    newValue.year(),
                    newValue.month() + 1
                  );
                  buscarDistribuidoMes(newValue.year(), newValue.month() + 1);
                }}
              />
            </LocalizationProvider>
          </Card>
        </Container>

        {!!autorizado.length && (
          <Container maxWidth="sm">
            <Card sx={{ p: "1rem", mb: ".5rem" }}>
              <Typography variant="h6" color="primary" align="center" mb={2}>
                AUTORIZOS
              </Typography>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={autorizado}
                columns={columns}
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
          </Container>
        )}

        {distribuido.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2} mb={1}>
            <Alert severity="info" variant="filled">La entidad no tiene distribuciones en la fecha seleccionada</Alert>
          </Stack>
        ) : (
          <Container maxWidth="sm">
            <Card sx={{ p: "1rem" }}>
              <Typography variant="h6" color="primary" align="center" mb={2}>
                DISTRIBUCIÓN
              </Typography>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={distribuido}
                columns={columns3}
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
          </Container>
        )}

        {redistribucion.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2} mt={1}>
            <Alert severity="info" variant="filled">La entidad no tiene redistribuciones en la fecha seleccionada</Alert>
          </Stack>
        ) : (
          <Container maxWidth="sm">
            <Card sx={{ p: "1rem" }}>
              <Typography variant="h6" color="primary" align="center" mb={2}>
                REDISTRIBUCIÓN
              </Typography>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={redistribucion}
                columns={columns2}
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
          </Container>
        )}

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<AddBoxIcon />}
            tooltipTitle="Añadir"
            onClick={() => router.push("/distribucion/nuevo")}
          />
        </SpeedDial>
      </MiniDrawer>
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session.rol != "administrador") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entidadDefault: session.identidad,
    },
  };
}
