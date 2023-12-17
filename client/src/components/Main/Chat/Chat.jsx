import React, { useState, useEffect, useContext } from 'react';
import { socket } from '../../../config/socket';
import { ConnectionState } from './ConnectionState/ConnectionState';
import { MessageBox } from "./MessageBox/MessageBox";
import { MyForm } from './MyForm/MyForm';
import { ConectionContext } from '../../../context/connectionContext';
import { MessagesContext } from '../../../context/messagesContext';
import { UserContext } from '../../../context/userContext';

export default function Chat() {

  const { updateConnection } = useContext(ConectionContext)

  const { setLogged } = useContext(UserContext)

  const { messages, setMessages } = useContext(MessagesContext)
  
  const [userName,setUserName] = useState('')

  useEffect(() => {

    function onConnect() {
      console.log('usuario conectado');
      updateConnection(true);
    }

    function onDisconnect() {
      console.log('usuario desconectado');
      updateConnection(false);
      setUserName('')
      setLogged(false)
    }

    function onSetUserNameEvent(value){
      console.log("evento set username ",value);
      if(value !== 'anonimo')
        setLogged(true)
      setUserName(value)
    }

    function onMessageEvent(value) {

      console.log('mensajes estado ' ,messages );

      console.log('llega por socket ',value);

      setMessages([...messages, value]);
    }

    function onSetAllMessagesEvent(value) {

      console.log('mensajes recuperados ' , value);

      setMessages(value);

    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('messageEvent', onMessageEvent);
    socket.on('setUserNameEvent', onSetUserNameEvent);
    socket.on('setAllMessagesEvent', onSetAllMessagesEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('messageEvent', onMessageEvent);
      socket.off('setUserNameEvent', onSetUserNameEvent);
      socket.off('setAllMessagesEvent', onSetAllMessagesEvent);

    };
  });

  useEffect(() => { socket.connect() }, [])


  return (
    <div className="Chat">
      <ConnectionState />
      <MessageBox messages={messages} userName={userName} />
      <MyForm />
    </div>
  );
}