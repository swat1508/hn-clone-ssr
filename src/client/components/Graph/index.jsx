import React from 'react';
import { Chart } from 'react-charts';

const MyChart = (props) => {
  const { list } = props;
  const graphData = [];

  for (let i = 0; i < list.length; i++) {
    if (list[i].num_comments) {
      graphData.push([list[i].points, list[i].num_comments]);
    } else {
      graphData.push([list[i].points, 0]);
    }
  }

  const data = [
    {
      label: 'Series 1',
      data: graphData,
    },
  ];

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );

  return (
    <div
      style={{
        width: '100%',
        height: '300px',
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  );
};

export default MyChart;
