import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';

const graphOptions = {
  xAxisId: 'Problem Set Size',
  yAxisId: 'myScale',
  scales: {
    myScale: {
      type: 'logarithmic',
      title: {
        display: true,
        text: 'Execution Time (Logarithmic)',
      },
      position: 'left',
    },
    'Problem Set Size': {
      title: {
        display: true,
        text: 'Problem set size',
      },
      position: 'bottom',
    },
  },
  maintainAspectRatio: false,
  plugins: [
    {
      title: {
        text: 'Test chart',
        display: true,
        font: { size: 20 },
      },
    },
  ],
};

const CreateLineGraph = ({ dataset, setImage }) => {
  const ref = useRef();

  return (
    <Line
      ref={ref}
      data={dataset}
      height="100%"
      id={'chart'}
      options={{
        ...graphOptions,
        animation: {
          onComplete: () => {
            setTimeout(() => setImage(() => ref.current?.toBase64Image()), 100);
          },
        },
      }}
    />
  );
};

export default React.memo(CreateLineGraph);
