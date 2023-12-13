import React, { useState } from "react";
import Chat from "./Chat/Chat";
import Home from './Home/Home';
import Login from "./Login/Login";
import SingUP from "./SingUP/SingUP";
import { socket } from "../../config/socket";
import { Route, Routes } from "react-router-dom";
import { ConectionContext } from "../../context/connectionContext";


const Main = () => {

    //   const [logged, setLogged] = useState(false);

    const [isConnected, setIsConnected] = useState(socket.connected);

    const updateConnection = (connection) => {
        setIsConnected(connection)
    }

    return <main className="main">
        <Routes>
            <Route path="/"
                element={
                    <>
                        <Home />
                    </>
                }
            />
            <Route path="/singUp"
                element={
                    <>
                        <SingUP />
                    </>
                }
            />
            <Route path="/login"
                element={
                    <>
                        <Login />
                    </>
                }
            />
            <Route path="/chat"
                element={
                    <ConectionContext.Provider value={{ isConnected, updateConnection }}>
                        <div>
                            <Chat />
                        </div>
                    </ConectionContext.Provider>
                }
            />
            <Route path="/*"
                element={
                    <><h1>Not found front</h1></>
                }
            />
        </Routes>
    </main>;
};

export default Main;