import {
  Alert,
  Card,
  Container,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ListItem,
  ListItemText,
  List,
  Divider,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataGrid, esES } from "@mui/x-data-grid";
import axios from "axios";
import Link from "next/link";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout";
import { useState } from "react";

function index({ entidades }) {
  const router = useRouter();

  const [entidadesSubordinadas, setEntidadesSubordinadas] = useState([]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEntidadesSubordinadas([]);
  };

  const obtenerEntidadesSubordinadas = async (identidad) => {
    try {
      const { data } = await axios.post(`/api/entidad/subordinados/`, {
        identidad,
      });
      setEntidadesSubordinadas(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 300,
      renderCell: (params) => (
        <Link href={`/entidad/${params.row.id}`} className="decoration-none">
          {params.row.nombre}
        </Link>
      ),
    },
    {
      field: "subordinado",
      headerName: "Subordinado",
      width: 300,
      renderCell: (params) => (
        <Typography variant="body1" color="initial" component="p">
          {params.row.sub_id ? params.row.subordinado : ""}
        </Typography>
      ),
    },
    {
      field: "subordinacion",
      headerName: "Subordinación",
      width: 150,
      renderCell: (params) => (
        <Typography
          variant="body1"
          color="initial"
          component="p"
          onClick={() => {
            obtenerEntidadesSubordinadas(params.row.id);
            handleClickOpen();
          }}
        >
          {params.row.subordinacion ? <AccountTreeIcon /> : ""}
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Entidades</title>
      </Head>
      <Layout>
        {entidades.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info" variant="filled">
              No hay entidades disponibles
            </Alert>
          </Stack>
        ) : (
          <Container maxWidth="md">
            <Card sx={{ p: "1rem" }}>
              <Typography variant="h6" color="primary" align="center" mb={2}>
                ENTIDADES
              </Typography>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={entidades}
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
          sx={{ position: "fixed", top: 80, right: 16 }}
          icon={<SpeedDialIcon />}
          direction="down"
        >
          <SpeedDialAction
            icon={<AddBoxIcon />}
            tooltipTitle="Añadir"
            onClick={() => router.push("/entidad/nuevo")}
          />
        </SpeedDial>
      </Layout>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle>Entidades subordinadas</DialogTitle>
        <Divider />
        <DialogContent>
          {!!entidadesSubordinadas.length ? (
            <>
              <List dense>
                {entidadesSubordinadas.map((e, index) => (
                  <ListItem key={index.toString()}>
                    <ListItemText primary={e.nombre} />
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="info" variant="filled">
                  Entidades no disponibles
                </Alert>
              </Stack>
            </>
          )}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="text">
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

  const { data: entidades } = await axios.get(
    `${process.env.MI_IP_BACKEND}/api/entidad/index2`
  );
  return {
    props: {
      entidades,
    },
  };
}
