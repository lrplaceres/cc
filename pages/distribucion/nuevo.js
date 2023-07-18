import FormNuevoDistribucion from "@/components/FormNuevoDistribucion";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout";

function nuevo({entidadDefault}) {
  return (
    <>
      <Layout>
        <FormNuevoDistribucion entidadDefault={entidadDefault}/>
      </Layout>
    </>
  );
}

export default nuevo;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session.rol != "administrador") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entidadDefault: session.identidad,
    },
  };
}
