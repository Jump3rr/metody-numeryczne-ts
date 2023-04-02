import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface IPoint {
  x: number;
  y: number;
}

export const Interpolation = () => {
  const [points, setPoints] = useState<IPoint[]>([]);
  const [chart, setChart] = useState<IPoint[]>([]);
  const [tempPointX, setTempPointX] = useState(0);
  const [tempPointY, setTempPointY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  useEffect(() => {
    if (chart.length < 2) return;
    removeChart();
    generateChart();
  }, [chart]);

  const addPoint = () => {
    if ((tempPointX || tempPointX === 0) && (tempPointY || tempPointY === 0)) {
      const newPoint: IPoint = { x: tempPointX, y: tempPointY };
      setPoints([...points, newPoint]);
    }
  };
  const execute = () => {
    if (points.length < 2) {
      return;
    }
    const sortedTab = points.sort((a, b) => a.x - b.x);
    const tempTab = [];
    for (
      let x = sortedTab[0].x;
      x <= sortedTab[sortedTab.length - 1].x;
      x = Number((x + 0.1).toFixed(2))
    ) {
      const newPoint: IPoint = { x: x, y: interpolate(x) };
      tempTab.push(newPoint);
      console.log(`${x} - ${interpolate(x)}`);
    }
    setChart(tempTab);
  };

  const interpolate = (x: number) => {
    let result = 0;
    for (let i = 0; i < points.length; i++) {
      let term = points[i].y;
      for (let j = 0; j < points.length; j++) {
        if (j !== i) {
          term *= (x - points[j].x) / (points[i].x - points[j].x);
        }
      }
      result += term;
    }
    return Number(result.toFixed(2));
  };
  const removeElement = (index: number) => {
    setPoints((prevPoints) => {
      const newPoints = [...prevPoints];
      newPoints.splice(index, 1);
      return newPoints;
    });
  };

  const removeChart = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
  };

  const generateChart = () => {
    const svg = d3.select(svgRef.current);

    const x = d3
      .scaleLinear()
      .domain([d3.min(chart, (d) => d.x) || 0, d3.max(chart, (d) => d.x) || 1])
      .nice()
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(chart, (d) => d.y) || 0, d3.max(chart, (d) => d.y) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<IPoint>()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append('path')
      .datum(chart)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
  };

  return (
    <>
      <div>Twoje punkty: </div>
      <div>
        {points.map((el, id) => {
          return (
            <div key={id}>
              <span>X: {el.x}</span>
              <span>Y: {el.y}</span>
              <button onClick={() => removeElement(id)}>DELETE</button>
            </div>
          );
        })}
      </div>
      <div>
        <span>X: </span>
        <input
          type='number'
          onChange={(event) => setTempPointX(event.target.valueAsNumber)}
        ></input>
      </div>
      <div>
        <span>Y: </span>
        <input
          type='number'
          onChange={(event) => setTempPointY(event.target.valueAsNumber)}
        ></input>
      </div>

      <button onClick={addPoint}>Dodaj</button>
      <div>
        <button onClick={execute}>Zrealizuj interpolację</button>
      </div>
      <div>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
        >
          <rect width='100%' height='100%' fill='transparent' />
        </svg>
      </div>
    </>
  );
};
