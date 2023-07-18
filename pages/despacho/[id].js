import FormNuevoDespacho from "@/components/FormNuevoDespacho";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Layout from "@/components/Layout";

function editar() {
  return (
    <Layout>
      <FormNuevoDespacho />
    </Layout>
  );
}

export default editar;

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