import React from 'react';
import './App.css';

import { Table } from './components/Table';
import { Chart } from './components/Chart';

const config = [
  {type: 'column', parentID: '0', id: 'aCol', key: 'aCol', label: 'A Column', dataType: 'number'},
  {type: 'column', parentID: '0', id: 'bCol', key: 'bCol', label: 'B Column', dataType: 'string'},
  {type: 'section', parentID: '0', id: 'section-12345', key: 'section', label: 'Section'},
  {type: 'column', parentID: 'section-12345', id: 'cCol', key: 'cCol', label: 'C Column', dataType: 'number'},
  {type: 'column', parentID: 'section-12345', id: 'dCol', key: 'dCol', label: 'D Column', dataType: 'number'},
]
const data = [
  { id: 'a Record', aCol: 14, bCol: 'string', dCol: 3132.32 },
  { id: 'hello', bCol: 'test string', cCol: 423, dCol: 1272.83 }
]

const chartConfig = {
  chartType: 'bar_line_combi',
  xAxisLabel: "Date",
  lineValues: [
    {
      name: "Line A", 
      stroke: "#3580f7",
      confidence: [
        {
          percentage: 10, 
          fill: '#4287f5'
        },
      ]
    },
    {
      name: "Line B", 
      stroke: "#a832a2",
      orientation: 'right'
    },
  ],
  yAxis: [
    { key: 'Line A', label: "mm"},
    { key: 'Line B', label: "mm", orientation: 'right'},
  ]
}

const chartData = [
  {name: 'Jan 20', 'Line A': 15.34, 'Line B': 32},
  {name: 'Feb 20', 'Line A': 11.34, 'Line B': 42},
  {name: 'Mar 20', 'Line A': 17.12, 'Line B': 37},
  {name: 'Apr 20', 'Line A': 22.18, 'Line B': 31},
  {name: 'May 20', 'Line A': 19.18, 'Line B': 76},
]

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="Table-container">
          <Table
            config={config}
            data={data}
            sortWithinTable
            onClick={() => console.log('this is working!')}
          />
        </div>
        <div>
          <Chart 
            configuration={chartConfig}
            data={chartData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
