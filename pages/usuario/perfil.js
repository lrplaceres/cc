import MiniDrawer from "@/components/drawer";
import { Card, Container, Typography, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

function perfil() {
  const { data: session, status } = useSession();

  return (
    <>
    <Head>
      <title>Perfil</title>
    </Head>
    <MiniDrawer>
      <Container maxWidth="sm">
        <Card sx={{ p: "1rem" }}>
          <Typography variant="h6" color="primary" mb={2}>PERFIL</Typography>
          <TextField
            label="Usuario"
            value={session?.usuario}
            aria-readonly
            fullWidth
            sx={{ mb: ".5rem" }}
          />
          <TextField
            label="Usuario"
            value={session?.user.name}
            aria-readonly
            fullWidth
            sx={{ mb: ".5rem" }}
          />
          <TextField
            label="Correo"
            value={session?.user.email}
            aria-readonly
            fullWidth
            sx={{ mb: ".5rem" }}
          />
          <TextField
            label="Entidad"
            value={session?.entidad}
            aria-readonly
            fullWidth
            sx={{ mb: ".5rem" }}
          />
        </Card>
      </Container>
    </MiniDrawer>
    </>
  );
}

export default perfil;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
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