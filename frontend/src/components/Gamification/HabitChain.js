import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function HabitChain({ habits }) {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous renders

        const width = 500;
        const height = 100;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        svg.attr('viewBox', [0, 0, width, height]);

        const x = d3.scaleLinear()
            .domain([0, d3.max(habits, d => d.progress)])
            .range([margin.left, width - margin.right]);

        const line = d3.line()
            .x((d, i) => x(i))
            .y((d) => height - d.progress);

        svg.append('path')
            .datum(habits)
            .attr('fill', 'none')
            .attr('stroke', '#4C1C24')
            .attr('stroke-width', 1.5)
            .attr('d', line);

    }, [habits]);

    return <svg ref={svgRef}></svg>;
}

export default HabitChain;
