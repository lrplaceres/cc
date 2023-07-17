import MiniDrawer from "@/components/drawer";
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
import Head from "next/head";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useRouter } from "next/router";
import { DataGrid, GridActionsCellItem, esES } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useState } from "react";
import { toast } from "react-toastify";

function index({ autorizos }) {
  const router = useRouter();

  const [ideliminar, setIdeliminar] = useState();

  const [autorizosFiltrados, setAutorizosFiltrados] = useState(autorizos);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const eliminarAutorizo = async (id) => {
    try {
      await axios.delete(`/api/autorizo/${id}`);
      toast.success("Se ha eliminado el autorizo");
      setAutorizosFiltrados(
        autorizosFiltrados.filter((item) => item.id != ideliminar)
      );
      handleClose();
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const columns = [
    {
      field: "combustible",
      headerName: "Combustible",
      width: 150,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
    },
    {
      field: "entidad",
      headerName: "Entidad",
      width: 320,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      renderCell: (params) => (
        <>{moment(params.row.fecha).utc().format("YYYY-MM-DD")}</>
      ),
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

  return (
    <>
      <Head>
        <title>Autorizos</title>
      </Head>
      <MiniDrawer>
        {autorizosFiltrados.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info" variant="filled">No hay autorizos disponibles</Alert>
          </Stack>
        ) : (
          <Container maxWidth="md">
            <Card sx={{ p: "1rem" }}>
              <Typography variant="h6" color="primary" align="center" mb={2}>
                AUTORIZOS
              </Typography>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={autorizosFiltrados}
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
            onClick={() => router.push("/autorizo/nuevo")}
          />
        </SpeedDial>
      </MiniDrawer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle>Eliminar autorizo</DialogTitle>
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
            onClick={() => eliminarAutorizo(ideliminar)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session.rol != "superadmin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: autorizos } = await axios.get(
    `${process.env.MI_IP_BACKEND}/api/autorizo`
  );
  return {
    props: {
      autorizos,
    },
  };
}
