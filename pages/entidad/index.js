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
import { DataGrid, esES } from "@mui/x-data-grid";
import axios from "axios";
import Link from "next/link";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

function index({ entidades }) {
  const router = useRouter();

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
        <Typography variant="body1" color="initial" component="p">
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
      <MiniDrawer>
        {entidades.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info" variant="filled">No hay entidades disponibles</Alert>
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
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<AddBoxIcon />}
            tooltipTitle="Añadir"
            onClick={() => router.push("/entidad/nuevo")}
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

  const { data: entidades } = await axios.get(
    `${process.env.MI_IP_BACKEND}/api/entidad/index2`
  );
  return {
    props: {
      entidades,
    },
  };
}
