import MiniDrawer from "@/components/drawer";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import FormNuevoAutorizo from "@/components/FormNuevoAutorizo";

function nuevo() {
  return (
    <>
      <MiniDrawer>
        <FormNuevoAutorizo />
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