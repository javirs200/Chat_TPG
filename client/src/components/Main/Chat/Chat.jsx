import React, { useState, useEffect, useContext } from 'react';
import socket from '../../../config/socket';
import ConnectionState from './ConnectionState/ConnectionState';
import MessageBox from "./MessageBox/MessageBox";
import MyForm from './MyForm/MyForm';
import { ConectionContext } from '../../../context/connectionContext';
import { MessagesContext } from '../../../context/messagesContext';
import { UserContext } from '../../../context/userContext';

const Chat = () => {

  const { updateConnection } = useContext(ConectionContext)

  const { setLogged } = useContext(UserContext)

  const { messages, setMessages } = useContext(MessagesContext)

  const [userName, setUserName] = useState('')

  useEffect(() => {

    function onConnect() {
      updateConnection(true);

      const transport = socket.io.engine.transport.name; // in most cases, "polling"
    
      console.log('transport client',transport)
    
      socket.io.engine.on("upgrade", () => {
        const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"
        console.log(' upgraded transport ',upgradedTransport);
      });
      
    }

    function onDisconnect() {
      updateConnection(false);
      setUserName('')
      setLogged(false)
    }

    function onSetUserNameEvent(value) {
      if (value !== 'anonimo')
        setLogged(true)
      setUserName(value)
    }

    function onMessageEvent(value) {
      setMessages([...messages, value]);
    }

    function onSetAllMessagesEvent(value) {
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

  useEffect(() => {
    //codigo para cuando monta el compomente
    socket.connect()
    return () => {
      //codigo para cuando desmonta el compomente
      socket.disconnect()
    }
  }, [])


  return (
    <div className="Chat">
      <img src="/logo192.png" alt="Chat TPG" />
      <br />
      <ConnectionState />
      <MessageBox messages={messages} userName={userName} date={new Date()} />
      <MyForm />
    </div>
  );
}

export default Chat