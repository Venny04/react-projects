import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 10, label: '7 classe' },
  { id: 1, value: 15, label: '8 classe' },
  { id: 2, value: 20, label: '9 classe' },
];

export default function PieActiveArc() {
  return (
    <PieChart
     
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'black' },
          
        },
      ]}
      margin={{ top: 20, bottom: 100, left: 0, right:0 }}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          padding: 3,
        },
      }}
      
      height={320}
     
    />
  );
}
