import Layout from "@/components/Layout";
import { Button, Card, Container, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";
import axios from "axios";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import bcrypt from "bcryptjs";

function contrasenna() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [usuario, setUsuario] = useState({
    actual: "",
    contrasena: "",
    repite: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = ({ target: { name, value } }) => {
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (usuario.contrasena != usuario.repite) {
        setUsuario({ ...usuario, ["contrasena"]: "" });
        return toast.error("Las contraseñas deben coincidir");
      }

      if (usuario.actual == usuario.contrasena) {
        return toast.error("Por favor introduzca una nueva contraseña");
      }

      var { data: cont } = await axios.post(`/api/usuario/login/`, {
        contrasena: bcrypt.hashSync(
          usuario.actual,
          "$2a$10$CwTysUXWue0Thq9StjUK0u"
        ),
        usuario: session?.usuario,
      });
      if (!cont) {
        return toast.error("Por favor verifique sus datos");
      }

      await axios.post(`/api/usuario/${session?.uid}`, {
        contrasena: bcrypt.hashSync(
          usuario.contrasena,
          "$2a$10$CwTysUXWue0Thq9StjUK0u"
        ),
      });
      toast.success("Se ha cambiado la contraseña");
      setTimeout(() => signOut(), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
      <Head>
        <title>Cambiar contraseña</title>
      </Head>
      <Layout>
        <Container maxWidth="sm">
          <Card sx={{ p: "1rem" }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" color="primary" align="center" mb={2}>
                Cambiar contraseña
              </Typography>
              <TextField
                id="actual"
                label="Constraseña actual"
                onChange={handleChange}
                name="actual"
                minLength={6}
                maxLength={35}
                autoComplete="off"
                required
                fullWidth
                value={usuario.actual}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: ".5rem" }}
              />

              <TextField
                id="contrasena"
                label="Nueva constraseña"
                onChange={handleChange}
                name="contrasena"
                minLength={6}
                maxLength={35}
                autoComplete="off"
                required
                fullWidth
                value={usuario.contrasena}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: ".5rem" }}
              />

              <TextField
                id="repite"
                label="Verifique Constraseña"
                onChange={handleChange}
                name="repite"
                minLength={6}
                maxLength={35}
                autoComplete="off"
                required
                fullWidth
                value={usuario.contrasena ? usuario.repite : ""}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: ".5rem" }}
              />

              <Button
                variant="contained"
                color="inherit"
                type="reset"
                startIcon={<CancelIcon />}
                sx={{ mr: "0.5rem" }}
                onClick={() => router.push("/")}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={
                  !usuario.actual ||
                  !usuario.contrasena ||
                  !usuario.repite ||
                  usuario.contrasena != usuario.repite
                }
                startIcon={<DoneIcon />}
              >
                Aceptar
              </Button>
            </form>
          </Card>
        </Container>
      </Layout>
    </>
  );
}

export default contrasenna;
