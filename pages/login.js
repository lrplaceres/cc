import { getCsrfToken } from "next-auth/react";
import Container from "@mui/material/Container";
import { TextField, Button, Box, Typography } from "@mui/material";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default function SignIn({ csrfToken }) {
  return (
    <>
      <Head>
        <title>Acceso</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/kisspng-car-computer-icons-filling-station-gasoline-fuel-d-gas-station-icon.png" sizes="any" />
      </Head>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "95vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            p: "1rem",
            width: 300,
            backgroundColor: "white",
            boxShadow:"0px 0px 3px 1px #938d8d"
          }}
        >
          <Typography variant="overline" color="initial" align="center" component="p">Ingrese sus credenciales</Typography>
          <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <TextField
              id="usuario"
              label="Usuario"
              name="usuario"
              fullWidth
              required
              sx={{ mb: ".5rem" }}
            />
            <TextField
              id="contrasena"
              label="Contraseña"
              name="contrasena"
              type="password"
              fullWidth
              required
              sx={{ mb: ".5rem" }}
            />
            <Button variant="contained" color="primary" type="submit">
              Aceptar
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
