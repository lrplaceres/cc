import MiniDrawer from "@/components/drawer";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import axios from "axios";
import Image from "next/image";
import VistaTablero from "@/components/VistaTablero";

function index() {
  return (
    <>
      <Head>
        <title>Tablero</title>
      </Head>
      <MiniDrawer>
        <VistaTablero />
      </MiniDrawer>
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {},
  };
}
