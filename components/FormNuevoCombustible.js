import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Head from "next/head";

function FormNuevoCombustible() {
  const router = useRouter();

  const [combustible, setCombustible] = useState({
    nombre: "",
    uid: uuidv4(),
  });

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (router.query.id) {
      obtenerCombustible();
    }
  }, []);

  const obtenerCombustible = async () => {
    try {
      const { data } = await axios.get("/api/combustible/" + router.query.id);
      setCombustible(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setCombustible({ ...combustible, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query.id) {
        await axios.put(`/api/combustible/${router.query.id}`, combustible);
        toast.success("Se ha editado el combustible");
      } else {
        await axios.post("/api/combustible", combustible);
        toast.success("Se ha creado el combustible");
      }
      setTimeout(() => router.push("/combustible"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const eliminarCombustible = async (id) => {
    try {
      await axios.delete(`/api/combustible/${id}`);
      toast.success("Se ha eliminado el combustible " + combustible.nombre);
      setTimeout(() => router.push("/combustible"), 250);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>
    <Head>
      <title>{router.query.id ? "Editar" : "Nuevo"} combustible</title>
    </Head>
      <Container maxWidth="sm">
        <Card sx={{ p: "1rem" }}>
          <Typography
            variant="overline"
            color="initial"
            align="center"
            component="p"
          >
            {router.query.id ? "Edite" : "Ingrese"} el tipo de combustible
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="nombre"
              label="Nombre"
              onChange={handleChange}
              name="nombre"
              minLength={3}
              required
              fullWidth
              sx={{ mb: "0.5rem" }}
              value={combustible.nombre}
            />

            <Button
              variant="contained"
              color="inherit"
              type="reset"
              startIcon={<CancelIcon />}
              sx={{ mr: "0.5rem" }}
              onClick={() => router.push("/combustible")}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={!combustible.nombre}
              startIcon={<DoneIcon />}
            >
              Aceptar
            </Button>
          </form>
        </Card>

        {router.query.id && (
          <Card sx={{ textAlign: "center", mt: "1.5rem", p: "1rem" }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleClickOpen}
            >
              Eliminar
            </Button>
          </Card>
        )}
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle>Eliminar tipo de combustible</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Al confirmar esta acción <strong>se borrarán los datos</strong>{" "}
            relacionados.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => eliminarCombustible(combustible.uid)}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormNuevoCombustible;
