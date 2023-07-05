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
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Link from "next/link";
import moment from "moment";
import EditNoteIcon from "@mui/icons-material/EditNote";

function index({ asignaciones }) {
  const router = useRouter();

  const columns = [
    {
      field: "combustible",
      headerName: "Combustible",
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
      field: "acciones",
      headerName: "Acciones",
      renderCell: (params) => (
        <Link
          href={`/asignacion/${params.row.id}`}
          className="decoration-none"
          title="Editar"
        >
          <EditNoteIcon />
        </Link>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Listado de asignaciones</title>
      </Head>
      <MiniDrawer>
        {asignaciones.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">No hay asignaciones disponibles</Alert>
          </Stack>
        ) : (
          <Container maxWidth="md">
            <Card elevation={0}>
            <Typography textAlign="center" variant="h4" color="initial">ASIGNACIONES</Typography>
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
  const { data: asignaciones } = await axios.get(
    `${process.env.MI_IP_BACKEND}/api/asignacion`
  );
  return {
    props: {
      asignaciones,
    },
  };
}
