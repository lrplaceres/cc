import MiniDrawer from "@/components/drawer";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Head from "next/head";

function listar() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [distribucion, setDistribucion] = useState([]);

  const [ideliminar, setIdeliminar] = useState();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        <>{moment(params.row.fecha).utc().format("YYYY-MM-DD")}</>
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
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Eliminar"
          onClick={() => {
            handleClickOpen();
            setIdeliminar(params.row.id);
          }}
          showInMenu
        />,
      ],
    },
  ];

  const eliminarDistribucion = async (id) => {
    try {
      await axios.delete(`/api/asignacion/${id}`);
      toast.success("Se ha eliminado la distribución");
      setDistribucion(distribucion.filter((item)=>item.id != ideliminar));
      handleClose();
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Head>
        <title>Distribución listado</title>
      </Head>
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
          <Container maxWidth="md">
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle>Eliminar distribución</DialogTitle>
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
            onClick={() => eliminarDistribucion(ideliminar)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
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
