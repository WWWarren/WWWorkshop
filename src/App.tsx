import React from 'react';
import './App.css';

import { Table } from './components/Table';

const config = [
  {type: 'column', parentID: '0', id: 'aCol', key: 'aCol', label: 'A Column', dataType: 'number'},
  {type: 'column', parentID: '0', id: 'bCol', key: 'bCol', label: 'B Column', dataType: 'string'},
  {type: 'section', parentID: '0', id: 'section-12345', label: 'Section'},
  {type: 'column', parentID: 'section-12345', id: 'cCol', key: 'cCol', label: 'C Column', dataType: 'number'},
  {type: 'column', parentID: 'section-12345', id: 'dCol', key: 'dCol', label: 'D Column', dataType: 'number'},
]

const data = [
  { aCol: 14, bCol: 'string', dCol: 3132.32 },
  { bCol: 'test string', cCol: 423, dCol: 1272.83 }
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
      </div>
    </div>
  );
}

export default App;
