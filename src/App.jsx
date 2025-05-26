import { max, scaleLinear, scaleBand } from "d3";
import { useEffect, useRef } from "react";
import dd from "./data.json";
const formatter = Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 2,
});
const data = dd.groupMapping.NO_GROUP.map((no_group) => {
  return {
    category: no_group.dataRowId.split("-%-")[1],
    value: dd.dataRowMapping[no_group.dataRowId].AC,
  };
});

const width = 1000;
const height = 500;

const maxValue = max(data, function (d) {
  return d.value;
});
const xScale = scaleBand()
  .domain(data.map((d) => d.category))
  .range([0, width])
  .padding(0.1);

const yScale = scaleLinear()
  .domain([0, maxValue + 500000])
  .range([height, 0]);
function App() {
  const canvasRef = useRef();
  const bandWidth = xScale.bandwidth();

  const drawYLine = (context) => {
    const ticks = yScale.ticks(data.length);

    ticks.forEach((tick, index) => {
      if (index === 0) return;
      const y = yScale(tick);
      context.font = "italic 10px Calibri";
      context.fillStyle = "black";

      context.beginPath();
      context.moveTo(50, y - 4);
      context.lineTo(width, y);
      context.setLineDash([5, 2]);
      context.strokeStyle = "#ddd";
      context.stroke();
      context.strokeStyle = "black";
      context.setLineDash([0, 0]);
      context.fillText(formatter.format(tick.toString()), 15, y);
    });
  };

  const drawXLine = (context) => {
    context.beginPath();
    context.moveTo(50, height - 12);
    context.lineTo(width, height - 12);
    context.stroke();
  };

  const drawPlot = (context) => {
    data.forEach((d) => {
      context.beginPath();
      context.arc(
        xScale(d.category) + bandWidth / 2,
        yScale(d.value),
        1.5,
        0,
        2 * Math.PI
      );
      context.fillStyle = "red";
      context.fill();
      context.closePath();
    });
  };
  const drawLineChart = (context) => {
    context.strokeStyle = "#4682B4";
    context.fillText(
      data[0].category,
      xScale(data[0].category) + bandWidth / 2 - 4,
      height - 2
    );
    context.beginPath();
    context.moveTo(
      xScale(data[0].category) + bandWidth / 2,
      yScale(data[0].value)
    );

    context.fillText(
      formatter.format(data[0].value),
      xScale(data[0].category) + bandWidth / 2 - 5,
      yScale(data[0].value) + 12
    );
    data.forEach((d, index) => {
      if (index === 0) return;

      context.lineTo(xScale(d.category) + bandWidth / 2, yScale(d.value));

      context.fillText(
        formatter.format(d.value),
        xScale(d.category) + bandWidth / 2 - 10,
        yScale(d.value) + 12
      );
      context.fillText(
        d.category,
        xScale(d.category) + bandWidth / 2 - 4,
        height - 2
      );
    });

    context.stroke();
    context.strokeStyle = "black";
  };
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const canvasContext = canvas.getContext("2d");
      canvasContext.font = "italic 10px Calibri";
      canvasContext.fillStyle = "black";
      drawYLine(canvasContext);
      drawXLine(canvasContext);
      drawLineChart(canvasContext);
      drawPlot(canvasContext);
    }
  }, []);

  return (
    <>
      <canvas height={height} width={width} ref={canvasRef} />
    </>
  );
}

export default App;
