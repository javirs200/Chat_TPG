import React, { useContext, useEffect } from 'react';
import Message from './Message/Message';
// import { ConectionContext } from '../../../../context/connectionContext';

export function MessageBox({ messages }) {

  // const { isConnected } = useContext(ConectionContext)

  const printMessages = () => {
    // let eventObj = {user:'',message:value}
    return messages.map((el, index) => {
      return <Message key={index} user={el.name} message={el.message} />
    })
  }

  return (

    <div className='MessageBox'>
      <h2>Sala FullStack:</h2>
      <div className='MessagesContainer'>
        {messages ? printMessages() : ''}
      </div>
    </div>

  );
}