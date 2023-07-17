import { getCsrfToken } from "next-auth/react";
import Container from "@mui/material/Container";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import Head from "next/head";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

export default function SignIn({ csrfToken }) {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME_APP}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fondo_azul.png" sizes="any" />
      </Head>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "95vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Image
          src={`/Horus.png`}
          width={200}
          height={140}
          alt="logo horus"
          priority={true}
        />
        <Box
          sx={{
            p: "1rem",
            width: 300,
            backgroundColor: "white",
            boxShadow: "0px 0px 3px 1px #938d8d",
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            align="center"
            component="p"
            marginBottom={2.5}
            marginTop={1}
          >
            INICIAR SESIÓN
          </Typography>
          <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <TextField
              id="usuario"
              label="Usuario"
              name="usuario"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
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

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Continuar
            </Button>
          </form>
        </Box>
        <Typography variant="button" color="primary" marginTop={2}>
          @XETID 2023
        </Typography>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
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
