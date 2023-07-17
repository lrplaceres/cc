import FormNuevoDistribucion from "@/components/FormNuevoDistribucion";
import MiniDrawer from "@/components/drawer";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

function nuevo({entidadDefault}) {
  return (
    <>
      <MiniDrawer>
        <FormNuevoDistribucion entidadDefault={entidadDefault}/>
      </MiniDrawer>
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
