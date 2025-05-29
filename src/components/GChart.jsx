import { gChartData as data } from "../data";
import { scaleLinear, scaleBand, max, min } from "d3";
import { useEffect, useRef } from "react";
import { calculateGChartLimits } from "../calculation";
const width = 1000;
const height = 550;
const padding = 16;
const maxValue = max(data, function (d) {
  return d.value;
});

const xScale = scaleBand()
  .domain(data.map((d) => d.date))
  .range([padding * 2, width])
  .padding(1);

const yScale = scaleLinear()
  .domain([0, maxValue])
  .range([height - padding * 5, padding]);
const GChart = () => {
  const canvasRef = useRef();
  const bandWidth = xScale.bandwidth();

  const { centerLine, upperControlLimit, lowerControlLimit } =
    calculateGChartLimits(data);
  const drawYLine = (context) => {
    const ticks = yScale.ticks(10);
    ticks.forEach((tick, index) => {
      if (index === 0) return;
      const y = yScale(tick);
      context.font = "italic 10px Calibri";
      context.fillStyle = "black";
      context.beginPath();
      context.moveTo(0, y - 4);
      context.lineTo(width, y);
      context.setLineDash([5, 2]);
      context.strokeStyle = "#ddd";
      context.stroke();
      context.strokeStyle = "black";
      context.setLineDash([0, 0]);
      context.fillText(tick.toString(), 0, y);
    });
  };

  const drawXLine = (context) => {
    context.beginPath();
    context.moveTo(0, height - padding * 5);
    context.lineTo(width, height - padding * 5);
    context.stroke();
  };

  const drawLine = (context, line, text, color) => {
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(padding, yScale(line));
    context.lineTo(width, yScale(line));
    context.font = "italic 10px Calibri";
    context.fillStyle = color;
    context.fillText(text, width - padding, yScale(line) - 2);
    context.stroke();
    context.strokeStyle = "black";
  };

  const drawPlot = (context) => {
    data.forEach((d) => {
      context.beginPath();
      context.arc(
        xScale(d.date) + bandWidth / 2,
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

    context.beginPath();
    context.moveTo(xScale(data[0].date) + bandWidth / 2, yScale(data[0].value));
    context.save();
    const x = xScale(data[0].date) - padding * 2;
    const y = height - padding * 2;
    context.translate(x, y);
    context.rotate(-Math.PI / 4);
    context.fillText(data[0].date, 0, 0);
    context.restore();

    data.forEach((d, index) => {
      if (index === 0) return;

      context.lineTo(xScale(d.date) + bandWidth / 2, yScale(d.value));

      context.save();
      const x = xScale(d.date) - padding * 2;

      const y = height - padding * 2;
      console.log(x, y);
      context.translate(x, y);
      context.rotate(-Math.PI / 4);
      context.fillText(d.date, 0, 0);
      context.restore();
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

      drawLine(canvasContext, centerLine, "CL", "red");
      drawLine(canvasContext, upperControlLimit, "UCL", "green");
      drawLine(canvasContext, lowerControlLimit, "LCL", "slateblue");
    }
  }, []);
  return (
    <>
      <canvas
        height={height}
        width={width}
        ref={canvasRef}
        style={{
          padding: "16px",
          margin: "20px",
        }}
      />
    </>
  );
};

export default GChart;
