import * as React from 'react';

function SVGComponent(props) {
  return (
    <svg
      width={55}
      height={12}
      viewBox="0 0 55 12"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs id="defs1" />
      <path
        style={{
          fill: '#595a63',
          fillOpacity: 1,
          fillRule: 'nonzero',
          strokeWidth: 0.946577,
        }}
        d="m 18.000004,11.711429 c 0.533801,0.144982 1.481127,0.130119 2.00151,-0.0088 0.01014,-5.7596183 0.02387,-5.7680934 28.495032,-5.700902 C 48.660862,5.5955434 48.646592,4.4222721 48.495961,4 18.001443,4.00281 18.002294,4.00567 18,11.711495 Z"
        id="path10"
      />
    </svg>
  );
}

export default SVGComponent;