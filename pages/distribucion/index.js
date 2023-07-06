import MiniDrawer from "@/components/drawer";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "dayjs/locale/es";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import axios from "axios";

function index() {
  const { data: session, status } = useSession();

  const buscarAsignacionesMes = async (anno, mes) => {
    try {
      var identidad = session.identidad;
      const { data } = await axios.post("/api/asignacion/buscarAsignadoMes", {
        anno,
        mes,
        identidad,
      });
    } catch (error) {
      toast.error("Ha ocurrido un error. Contacte al administrador");
    }
  };

  return (
    <MiniDrawer>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DateCalendar
          //defaultValue={dayjs(new Date())}
          views={["year", "month"]}
          openTo="year"
          minDate={dayjs("2023-07-01")}
          maxDate={dayjs("2025-12-12")}
          onChange={(newValue) =>
            buscarAsignacionesMes(newValue.year(), newValue.month() + 1)
          }
        />
      </LocalizationProvider>
    </MiniDrawer>
  );
}

export default index;
