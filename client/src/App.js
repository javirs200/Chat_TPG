import { useState } from 'react'
import {ConectionContext} from './context/connectionContext'
import Main from './components/Main/Main'
import { socket } from './config/socket'

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected);

  const updateConnection = (connection) => {
    setIsConnected(connection)
  }

  return (
    <ConectionContext.Provider value={{ isConnected, updateConnection }}>
      <div>
        <Main />
      </div>
    </ConectionContext.Provider>
  )
}

export default App