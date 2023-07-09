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
import AddBoxIcon from "@mui/icons-material/AddBox";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Link from "next/link";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

function index({ usuarios }) {
  const router = useRouter();

  const columns = [
    {
      field: "usuario",
      headerName: "Usuario",
      width: 150,
      renderCell: (params) => (
        <Link href={`/usuario/${params.row.id}`} className="decoration-none">
          {params.row.activo ? (
            params.row.usuario
          ) : (
            <del>{params.row.usuario}</del>
          )}
        </Link>
      ),
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 250,
    },
    {
      field: "rol",
      headerName: "Rol",
      width: 150,
    },
    {
      field: "entidad",
      headerName: "Entidad",
      width: 250,
    },
  ];

  return (
    <>
      <Head>
        <title>Usuarios</title>
      </Head>
      <MiniDrawer>
        {usuarios.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">No hay usuarios disponibles</Alert>
          </Stack>
        ) : (
          <Container maxWidth="md">
            <Card sx={{ p: "1rem" }}>
            <Typography variant="h6" color="primary" align="center" mb={2}>USUARIOS</Typography>
              <DataGrid
                rows={usuarios}
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
            onClick={() => router.push("/usuario/nuevo")}
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
  
  const { data: usuarios } = await axios.get(
    `${process.env.MI_IP_BACKEND}/api/usuario`
  );
  return {
    props: {
      usuarios,
    },
  };
}
