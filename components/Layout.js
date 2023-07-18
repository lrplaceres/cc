import Head from "next/head";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import MenuAppBar from "./MenuAppBar";

function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fondo_azul.png" sizes="any" />
      </Head>
      <MenuAppBar />
      <Container sx={{ mt: "4rem" }}>{children}</Container>
      <ToastContainer />
    </>
  );
}

export default Layout;
