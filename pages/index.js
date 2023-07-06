import MiniDrawer from "@/components/drawer";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import axios from "axios";
import Image from "next/image";

function index() {
  return (
    <>
      <Head>
        <title>Tablero</title>
      </Head>
      <MiniDrawer>{process.env.NEXT_PUBLIC_MI_URL}</MiniDrawer>
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
