import ReactEcharts from "echarts-for-react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function GraficoSumaAutorizos({ topSumaAutorizos }) {
    const combutibles = [];
    const cantidades = [];
    topSumaAutorizos.map((a) => {
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
          TOP LITROS AUTORIZADOS
        </Typography>
        <Box pl={5}>
          <ReactEcharts option={option} />
        </Box>
      </>
    );
  }

export default GraficoSumaAutorizos