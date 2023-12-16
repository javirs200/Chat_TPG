import React, { useContext, useEffect } from 'react';
import Message from './Message/Message';
// import { ConectionContext } from '../../../../context/connectionContext';

export function MessageBox({ messages, userName }) {

  // const { isConnected } = useContext(ConectionContext)

  const printMessages = () => {
    // let eventObj = {user:'',message:value}
    return messages.map((el, index) => {
      if (userName == el.name)
        return <Message key={index} user={el.name} message={el.message} type={1} />
      else
        return <Message key={index} user={el.name} message={el.message} type={0} />
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