import { useEffect, useState } from "react";
import GraficoDespachos from "./GraficoDespachos";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import GraficosAutorizos from "./GraficoAutorizos";
import { Box, Fab, Grid, SwipeableDrawer } from "@mui/material";
import GraficoTopAutorizos from "./GraficoTopAutorizos";
import GraficoSumaAutorizos from "./GraficoSumaAutorizos";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DatePicker } from "@mui/x-date-pickers";

function VistaTablero2() {
  const { data: session, status } = useSession();

  const [anno, setAnno] = useState(dayjs().year());

  const [mes, setMes] = useState(dayjs().month() + 1);

  const [despachos, setDespachos] = useState([]);

  const [autorizos, setAutorizos] = useState([]);

  const [topAutorizos, setTopAutorizos] = useState([]);

  const [topSumaAutorizos, setTopSumaAutorizos] = useState([]);

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    buscarDespachosFecha(anno, mes);
    buscarAutorizosFecha(anno, mes);
    buscarTopAutorizosFecha(anno, mes);
    buscarTopSumaAutorizosFecha(anno, mes);
  }, []);

  const buscarDespachosFecha = async (anno, mes) => {
    try {
      const { data } = await axios.post("/api/despacho/despachosMes", {
        anno,
        mes,
      });
      setDespachos(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const buscarAutorizosFecha = async (anno, mes) => {
    try {
      const { data } = await axios.post("/api/autorizo/autorizosMes", {
        anno,
        mes,
      });
      setAutorizos(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const buscarTopAutorizosFecha = async (anno, mes) => {
    try {
      const { data } = await axios.post("/api/autorizo/mayorCantidadAutorizos", {
        anno,
        mes,
      });
      setTopAutorizos(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  const buscarTopSumaAutorizosFecha = async (anno, mes) => {
    try {
      const { data } = await axios.post("/api/autorizo/mayorSumadorAutorizos", {
        anno,
        mes,
      });
      setTopSumaAutorizos(data);
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <>

<div>
        <Fab
          color="warning"
          variant="circular"
          aria-label="icono_filtro"
          onClick={toggleDrawer("right", true)}
          sx={{ position: "fixed", top: 80, right: 16 }}
        >
          <FilterAltIcon />
        </Fab>
        <SwipeableDrawer
          sx={{ pt: 10, px: 1 }}
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          <Box
            sx={{
              width: 250,
              pt: 1,
              px: 1,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker
                defaultValue={dayjs(new Date())}
                label={"Seleccionar mes"}
                views={["year", "month"]}
                openTo="year"
                minDate={dayjs("2023-07-01")}
                maxDate={dayjs("2026-12-12")}
                onChange={(newValue) => {
                  buscarDespachosFecha(newValue.year(), newValue.month() + 1);
                  buscarAutorizosFecha(newValue.year(), newValue.month() + 1);
                  buscarTopAutorizosFecha(newValue.year(), newValue.month() + 1);
                  buscarTopSumaAutorizosFecha(newValue.year(), newValue.month() + 1);
                  setAnno(newValue.year());
                  setMes(newValue.month() + 1);
                }}
                sx={{ display: "flex" }}
              />
            </LocalizationProvider>

          </Box>
        </SwipeableDrawer>
      </div>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <GraficosAutorizos autorizos={autorizos} />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraficoDespachos despachos={despachos} />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <GraficoTopAutorizos topAutorizos={topAutorizos}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <GraficoSumaAutorizos topSumaAutorizos={topSumaAutorizos}/>
        </Grid>
        </Grid>
    </>
  );
}

export default VistaTablero2;
