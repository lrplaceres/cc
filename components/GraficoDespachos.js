import ReactEcharts from "echarts-for-react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function GraficoDespachos({despachos}) {
  const valores = [];
  despachos.map((r) => {
    valores.push({ value: r.cantidad, name: r.nombre });
  });
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: valores
      }
    ]
  };

  return (
    <>
      <Typography variant="h6" color="primary" align="center">
        DESPACHOS
      </Typography>
      <Box pl={5}>
        <ReactEcharts option={option} />
      </Box>
    </>
  );
}

export default GraficoDespachos;
