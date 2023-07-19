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
import axios from "axios";
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout";

function index({ combustibles }) {
  const router = useRouter();

  const columns = [
    {
      field: "Link",
      headerName: "Nombre",
      flex: 1,
      renderCell: (params) => (
        <Link
          href={`/combustible/${params.row.id}`}
          className="decoration-none"
        >
          {params.row.nombre}
        </Link>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Combustibles</title>
      </Head>
      <Layout>
        {combustibles.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info" variant="filled">No hay combustibles disponibles</Alert>
          </Stack>
        ) : (
          <Container maxWidth="sm">
            <Card sx={{ p: "1rem" }}>
              <Typography variant="h6" color="primary" align="center" mb={2}>
                COMBUSTIBLES
              </Typography>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={combustibles}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 25,
                    },
                  },
                }}
                pageSizeOptions={[25]}
                slots={{ toolbar: GridToolbar }}
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
            onClick={() => router.push("/combustible/nuevo")}
          />
        </SpeedDial>
      </Layout>
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

  const { data: combustibles } = await axios.get(
    `${process.env.MI_IP_BACKEND}/api/combustible`,
    {
      withCredentials: true,
    }
  );
  return {
    props: {
      combustibles,
    },
  };
}
