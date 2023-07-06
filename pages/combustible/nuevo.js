import FormNuevoCombustible from "@/components/FormNuevoCombustible";
import MiniDrawer from "@/components/drawer";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

function nuevo() {
  return (
    <>
      <MiniDrawer>
        <FormNuevoCombustible />
      </MiniDrawer>
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