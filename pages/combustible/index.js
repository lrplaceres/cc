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
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";

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
        <title>Listado de combustibles</title>
      </Head>
      <MiniDrawer>
        {combustibles.length === 0 ? (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">No hay combustibles disponibles</Alert>
          </Stack>
        ) : (
          <Container maxWidth="sm">
            <Card elevation={0}>
            <Typography textAlign="center" variant="h4" color="initial">COMBUSTIBLES</Typography>
              <DataGrid
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
            onClick={() => router.push("/combustible/nuevo")}
          />
        </SpeedDial>
      </MiniDrawer>
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const { data: combustibles } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/combustible`
  );
  return {
    props: {
      combustibles,
    },
  };
}
