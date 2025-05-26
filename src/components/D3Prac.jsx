import * as d3 from "d3";

function D3Prac() {
  const data = [
    { category: "A", value: 70 },
    { category: "B", value: 80 },
    { category: "C", value: 40 },
  ];

  const width = 500;
  const height = 300;

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.category))
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear().domain([0, height]).range([height, 0]);

  const svgStyles = {
    border: "2px dashed black",
  };
  return (
    <>
      <svg width={width} height={height} style={svgStyles}>
        {data.map((d) => {
          console.log(
            `${d.category} - X: ${xScale(d.category)} - Y: ${yScale(d.value)}`
          );
          return (
            <g key={d.category}>
              <rect
                x={xScale(d.category)}
                y={yScale(d.value)}
                width={xScale.bandwidth()}
                height={height - yScale(d.value)}
                fill="steelblue"
              />
              <text x={xScale(d.category)} y={yScale(d.value)} fill="blue">
                {d.category}
              </text>
            </g>
          );
        })}
      </svg>
    </>
  );
}

export default D3Prac;
