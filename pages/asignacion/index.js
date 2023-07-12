import MiniDrawer from "@/components/drawer";
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
import Head from "next/head";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useRouter } from "next/router";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

function index({ asignaciones }) {
  const router = useRouter();

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
          icon={<EditNoteIcon color="primary"/>}
          label="Editar"
          onClick={() => router.push(`/asignacion/${params.row.id}`)}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Asignaciones</title>
      </Head>
      <MiniDrawer>
        {asignaciones.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">No hay asignaciones disponibles</Alert>
          </Stack>
        ) : (
          <Container maxWidth="md">
            <Card sx={{ p: "1rem" }}>
              <Typography variant="h6" color="primary" align="center" mb={2}>
                ASIGNACIONES
              </Typography>
              <DataGrid
                rows={asignaciones}
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
            onClick={() => router.push("/asignacion/nuevo")}
          />
        </SpeedDial>
      </MiniDrawer>
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

  const { data: asignaciones } = await axios.get(
    `${process.env.MI_IP_BACKEND}/api/asignacion`
  );
  return {
    props: {
      asignaciones,
    },
  };
}
