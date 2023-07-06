import FormNuevoDespacho from "@/components/FormNuevoDespacho";
import MiniDrawer from "@/components/drawer";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

function editar() {
  return (
    <MiniDrawer>
      <FormNuevoDespacho />
    </MiniDrawer>
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