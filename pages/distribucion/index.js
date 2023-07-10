import MiniDrawer from "@/components/drawer";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/es";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
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

function index() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [asignado, setAsignado] = useState([]);

  const [anno, setAnno] = useState();

  const [mes, setMes] = useState();

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
      headerName: "Distribuido",
    },
    {
      field: "restante",
      headerName: "Restante",
      valueGetter: restante,
    },
  ];

  const buscarAsignacionesMes = async (anno, mes) => {
    try {
      var identidad = session.identidad;
      const { data } = await axios.post("/api/asignacion/buscarAsignadoMes", {
        anno,
        mes,
        identidad,
      });
      setAsignado(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <MiniDrawer>
      <Container maxWidth="sm">
        <Card sx={{ p: "1rem", mb: "1rem",display:"flex",justifyContent:"center" }}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="es"
          >
            <DatePicker
              label={"Seleccionar mes"}
              views={["year", "month"]}
              openTo="year"
              minDate={dayjs("2023-07-01")}
              maxDate={dayjs("2026-12-12")}
              onChange={(newValue) => {
                buscarAsignacionesMes(newValue.year(), newValue.month() + 1);
                setAnno(newValue.year());
                setMes(newValue.month() + 1);
              }}
            />
          </LocalizationProvider>
        </Card>
      </Container>

      {asignado.length === 0 ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">No hay asignaciones disponibles</Alert>
        </Stack>
      ) : (
        <Container maxWidth="sm">
          <Card sx={{ p: "1rem" }}>
            <Typography variant="h6" color="primary" align="center" mb={2}>
              ASIGNACIONES
            </Typography>
            <DataGrid
              rows={asignado}
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
    props: {},
  };
}
