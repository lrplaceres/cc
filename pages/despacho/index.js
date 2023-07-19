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
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { DataGrid, esES, GridToolbar  } from "@mui/x-data-grid";
import moment from "moment";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout";

function index({ despachos }) {
  const router = useRouter();

  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 140,
      renderCell: (params) => (
        <Link href={`/despacho/${params.row.id}`} className="decoration-none">
          {moment(params.row.fecha).utc().format("YYYY-MM-DD")}
        </Link>
      ),
    },
    {
      field: "combustible",
      headerName: "Combustible",
      width: 220,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      width: 150,
    },
  ];

  return (
    <>
      <Head>
        <title>Despachos</title>
      </Head>
      <Layout>
        {despachos.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info" variant="filled">No hay despachos disponibles</Alert>
          </Stack>
        ) : (
          <Container maxWidth="sm">
            <Card sx={{ p: "1rem" }}>
              <Typography variant="h6" color="primary" align="center" mb={2}>
                DESPACHOS
              </Typography>
              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={despachos}
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
            onClick={() => router.push("/despacho/nuevo")}
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

  const { data: despachos } = await axios.get(
    `${process.env.MI_IP_BACKEND}/api/despacho`
  );
  return {
    props: {
      despachos,
    },
  };
}
