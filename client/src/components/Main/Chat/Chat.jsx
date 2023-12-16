import React, { useState, useEffect, useContext } from 'react';
import { socket } from '../../../config/socket';
import { ConnectionState } from './ConnectionState/ConnectionState';
import { MessageBox } from "./MessageBox/MessageBox";
import { MyForm } from './MyForm/MyForm';

import { ConectionContext } from '../../../context/connectionContext';
import { UserContext } from '../../../context/userContext';

export default function Chat() {

  const { updateConnection } = useContext(ConectionContext)

  const { logged } = useContext(UserContext)

  const [messages, setMessages] = useState([]);
  const [userName,setUserName] = useState('')

  useEffect(() => {

    function onConnect() {
      console.log('usuario conectado');
      updateConnection(true);
    }

    function onDisconnect() {
      console.log('usuario desconectado');
      updateConnection(false);
    }

    function onSetUserNameEvent(value){
      if(logged){
        console.log(value);
        setUserName(value)
      }
    }

    function onMessageEvent(value) {

      console.log('llega por socket ',value);

      setMessages([...messages, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('messageEvent', onMessageEvent);
    socket.on('setUserNameEvent', onSetUserNameEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('messageEvent', onMessageEvent);
      socket.off('setUserNameEvent', onSetUserNameEvent);

    };
  });

  useEffect(() => { socket.connect() }, [])


  return (
    <div className="Chat">
      <ConnectionState />
      <MessageBox messages={messages} userName={userName} />
      {/* aniadir boton de dissconect */}
      <MyForm />
    </div>
  );
}