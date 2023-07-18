import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import VistaTablero from "@/components/VistaTablero";
import Layout from "@/components/Layout";
import VistaTablero2 from "@/components/VistaTablero2";
import { useSession } from "next-auth/react";

function index({ entidadDefault }) {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Tablero</title>
      </Head>
      <Layout>
        {(session?.rol == "superadmin" || session?.rol == "cliente") && (
          <>
            <VistaTablero2 />
          </>
        )}

        {session?.rol == "administrador" && (
          <>
            <VistaTablero entidadDefault={entidadDefault} />
          </>
        )}
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
