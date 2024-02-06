import React, { useState } from "react";
import Chat from "./Chat/Chat";
import Home from './Home/Home';
import Login from "./Login/Login";
import SingUP from "./SingUP/SingUP";
import RoomList from "./RoomList/RoomList";
import socket from "../../config/socket";
import { Route, Routes } from "react-router-dom";
import { ConectionContext } from "../../context/connectionContext";
import { UserContext } from "../../context/userContext";
import { MessagesContext } from "../../context/messagesContext";

const Main = () => {

    const [logged, setLogged] = useState(false);

    const [messages, setMessages] = useState([]);

    const [isConnected, setIsConnected] = useState(socket.connected);

    const updateConnection = (connection) => {
        setIsConnected(connection)
    }

    return <main className="main">
        <UserContext.Provider value={{ logged, setLogged }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/singUp" element={<SingUP />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chatrooms" element={<RoomList />} />
                <Route path="/chat" element={
                    <MessagesContext.Provider value={{ messages, setMessages }}>
                        <ConectionContext.Provider value={{ isConnected, updateConnection }}>
                            <div>
                                <Chat />
                            </div>
                        </ConectionContext.Provider>
                    </MessagesContext.Provider>} />
                <Route path="/*" element={<><h1>Not found front</h1></>} />
            </Routes>
        </UserContext.Provider>
    </main>;
};

export default Main;