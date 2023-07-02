import MiniDrawer from "@/components/drawer";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import Head from "next/head";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useRouter } from "next/router";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Link from "next/link";

function index() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Listado de asignaciones</title>
      </Head>
      <MiniDrawer>
        index asignacion
        
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
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
