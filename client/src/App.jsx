import { BrowserRouter } from 'react-router-dom';

import Main from './components/Main/Main'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './styles/styles.scss'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
    <CssBaseline />
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App