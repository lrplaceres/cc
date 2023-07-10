import MiniDrawer from "@/components/drawer";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import axios from "axios";
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
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import moment from "moment";
import AddBoxIcon from "@mui/icons-material/AddBox";

function listar() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [distribucion, setDistribucion] = useState([]);

  const [anno, setAnno] = useState();

  const [mes, setMes] = useState();

  const buscarDistribucionMes = async (anno, mes) => {
    try {
      var identidad = session.identidad;
      const { data } = await axios.post(
        "/api/asignacion/xMesxDistribucionxEntidadesSubordinadas",
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

  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      renderCell: (params) => (
        <Link href={`/asignacion/${params.row.id}`} className="decoration-none">
          {moment(params.row.fecha).utc().format("YYYY-MM-DD")}
        </Link>
      ),
    },
    {
      field: "combustible",
      headerName: "Combustible",
      width: 160,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
    },
    {
      field: "entidad",
      headerName: "Entidad",
      width: 250,
    },
  ];

  return (
    <>
      <MiniDrawer>
        <Container maxWidth="sm">
          <Card
            sx={{
              p: "1rem",
              mb: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                label={"Seleccionar mes"}
                views={["year", "month"]}
                openTo="year"
                minDate={dayjs("2023-07-01")}
                maxDate={dayjs("2026-12-12")}
                onChange={(newValue) => {
                  buscarDistribucionMes(newValue.year(), newValue.month() + 1);
                  setAnno(newValue.year());
                  setMes(newValue.month() + 1);
                }}
              />
            </LocalizationProvider>
          </Card>
        </Container>

        {distribucion.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">No hay distribuciones disponibles</Alert>
          </Stack>
        ) : (
          <Container maxWidth="sm">
            <Card sx={{ p: "1rem" }}>
              <Typography variant="h6" color="primary" align="center" mb={2}>
                DISTRIBUCIONES
              </Typography>
              <DataGrid
                rows={distribucion}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 25,
                    },
                  },
                }}
                pageSizeOptions={[25]}
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

export default listar;

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
    props: {},
  };
}
