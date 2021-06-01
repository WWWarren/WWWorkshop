import React from 'react';
import './App.css';

import { Table } from './components/Table';

const config = [
  {type: 'column', id: 'aCol', key: 'aCol', label: 'A Column'},
  {type: 'column', id: 'bCol', key: 'bCol', label: 'B Column'},
]

const data = [
  { aCol: 14, bCol: 'string' },
  { bCol: 'test string' }
]

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="Table-container">
          <Table
            config={config}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
