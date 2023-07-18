import ReactEcharts from "echarts-for-react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function GraficoTopAutorizos({ topAutorizos }) {
  const combutibles = [];
  const cantidades = [];
  topAutorizos.map((a) => {
    combutibles.push(a.nombre);
    cantidades.push(a.cantidad);
  });
  const option = {
    tooltip: {},
    legend: {},
    xAxis: {
      type: "category",
      data: combutibles,
      axisLabel: { interval: 0, rotate: 30 },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: cantidades,
        type: "bar",
      },
    ],
  };
  return (
    <>
      <Typography variant="h6" color="primary" align="center">
        TOP AUTORIZOS
      </Typography>
      <Box pl={5}>
        <ReactEcharts option={option} />
      </Box>
    </>
  );
}

export default GraficoTopAutorizos;
