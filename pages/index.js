import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import VistaTablero from "@/components/VistaTablero";
import Layout from "@/components/Layout";

function index({ entidadDefault }) {
  return (
    <>
      <Head>
        <title>Tablero</title>
      </Head>
      <Layout>
        <VistaTablero entidadDefault={entidadDefault} />
      </Layout>
    </>
  );
}

export default index;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: { entidadDefault: session.identidad },
  };
}
