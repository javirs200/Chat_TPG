import React, { useState, useEffect, useContext } from 'react';
import { socket } from '../../../config/socket';
import { ConnectionState } from './ConnectionState/ConnectionState';
import { ConnectionManager } from './ConnectionManager/ConnectionManager';
import { MessageBox } from "./MessageBox/MessageBox";
import { MyForm } from './MyForm/MyForm';

import { ConectionContext } from '../../../context/connectionContext';

export default function Chat() {

  const { updateConnection } = useContext(ConectionContext)

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log('usuario conectado');
      updateConnection(true);
    }

    function onDisconnect() {
      console.log('usuario desconectado');
      updateConnection(false);
    }

    function onMessageEvent(value) {

      console.log('llega por socket ',value);

      setMessages([...messages, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('messageEvent', onMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('messageEvent', onMessageEvent);
    };
  });

  useEffect(() => { socket.connect() }, [])



  return (
    <div className="Chat">
      <ConnectionState />

      <MessageBox messages={messages} />
      
      {/* aniadir boton de dissconect */}
      <MyForm />
    </div>
  );
}