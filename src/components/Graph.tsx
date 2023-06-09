import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GraphProps {
  a: number;
  b: number;
  data: { t: number; T: number }[];
}

const Graph: React.FC<GraphProps> = ({ a, b, data }) => {
  const ref = useRef<SVGSVGElement>(null);
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).selectAll('*').remove();

      const svg = d3
        .select(ref.current)
        .attr(
          'viewBox',
          `0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`
        )
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.t) as [number, number])
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.T)!])
        .range([height, 0]);

      const line = d3
        .line<{ t: number; T: number }>()
        .x((d) => x(d.t))
        .y((d) => y(a * Math.exp(b * d.t)));

      svg
        .append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${height})`)
        .style('stroke-dasharray', '3,3')
        .call(
          d3
            .axisBottom(x)
            .ticks(5)
            .tickSize(-height)
            .tickFormat(() => '')
        );

      svg
        .append('g')
        .attr('class', 'grid')
        .style('stroke-dasharray', '3,3')
        .call(
          d3
            .axisLeft(y)
            .ticks(5)
            .tickSize(-width)
            .tickFormat(() => '')
        );

      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g').call(d3.axisLeft(y));

      svg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);

      svg
        .selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', function (d) {
          return x(d.t);
        })
        .attr('cy', function (d) {
          return y(a * Math.exp(b * d.t));
        })
        .attr('r', 2);
    }
  }, [a, b, data]);

  return <svg ref={ref} width={1000} height={700} />;
};

export default Graph;
