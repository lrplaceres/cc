import ReactEcharts from "echarts-for-react";
import Typography from "@mui/material/Typography";

function GraficosCombustiblesDistribuidos({ distribucion }) {
  const valores = [];
  distribucion.map((r) => {
    valores.push({ value: r.distribuido, name: r.nombre });
  });
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {       
        type: 'pie',
        radius: '50%',
        data: valores,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <>
      <Typography variant="h6" color="primary" align="center">
        DISTRIBUIDO
      </Typography>
      <ReactEcharts option={option} />
    </>
  );
}

export default GraficosCombustiblesDistribuidos;
