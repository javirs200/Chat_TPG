import React, { useState, useEffect, useContext } from 'react';
import { socket } from '../../../config/socket';
import { ConnectionState } from './ConnectionState/ConnectionState';
import { ConnectionManager } from './ConnectionManager/ConnectionManager';
import { Events } from "./Events/Events";
import { MyForm } from './MyForm/MyForm';

import { ConectionContext } from '../../../context/connectionContext';

export default function Chat() {

  const { updateConnection } = useContext(ConectionContext)

  const [messageEvents, setMessageEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      updateConnection(true);
    }

    function onDisconnect() {
      updateConnection(false);
    }

    function onMessageEvent(value) {
      setMessageEvents([...messageEvents, value]);
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

  return (
    <div className="Main">
      <ConnectionState />
      <Events events={messageEvents} />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}