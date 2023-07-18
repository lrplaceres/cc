import ReactEcharts from "echarts-for-react";
import Typography from "@mui/material/Typography";

function GraficoCombustiblesRedistribuidos({ redistribuciones }) {
  const valores = [];
  redistribuciones.map((r) => {
    valores.push({ name: r.nombre, value: r.midistribucion });
  });
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {        
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: valores,
      },
    ],
  };
  return (
    <>
      <Typography variant="h6" color="primary" align="center">
        REDISTRIBUIDO
      </Typography>
      <ReactEcharts option={option} />
    </>
  );
}

export default GraficoCombustiblesRedistribuidos;
