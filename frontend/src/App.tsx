import React from 'react';

import './App.css';
import  Loader  from './components/Loader';
import Allroutes from './pages/Allroutes';
function App() {
  return (
    <div className="App">
    {/* <Loader/> */}
    <Allroutes/>
    </div>
  );
}

export default App;
