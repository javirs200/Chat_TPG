import React,{ useState } from 'react'
import Main from './components/Main/Main'
// import Header from './components/Header/header'
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <Main />
      </BrowserRouter>
    </div>
  )
}

export default App