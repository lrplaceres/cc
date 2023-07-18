import FormNuevoUsuario from "@/components/FormNuevoUsuario";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout";

function nuevo() {
  return (
    <>
      <Layout>
        <FormNuevoUsuario />
      </Layout>
    </>
  );
}

export default nuevo;

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

  return {
    props: {},
  };
}