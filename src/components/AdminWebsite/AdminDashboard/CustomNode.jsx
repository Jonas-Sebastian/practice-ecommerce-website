import React from 'react';

const CustomNode = ({ x, y, width, height, index, payload }) => {
  // Access the node name and value from the payload
  const { name, value } = payload;

  return (
    <g>
      {/* Render the default node (as a rectangle) */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#1976d2"
        strokeWidth={1}
        rx={5}
        ry={5}
      />

      {/* Render the label */}
      <text
        x={x + 20} // Position the name text a bit to the right of the node
        y={y + height / 2 - 10}
        textAnchor="start"
        fill="#000000"
        fontSize={12}
        dy={5}
      >
        {name}
      </text>

      {/* Render the value text */}
      <text
        x={x + 20} // Position the value text similarly (or adjust as needed)
        y={y + height / 2 + 10} // Move it below the name text
        textAnchor="start"
        fill="#000000"
        fontSize={12}
      >
        {value}
      </text>
    </g>
  );
};

export default CustomNode;
