import React from 'react';
import Message from './Message/Message';
import { formatDistance } from "date-fns";

const MessageBox = ({ messages, userName ,date }) => {

  const printMessages = () => {
    // let eventObj = {user:'',message:value}

    return messages.map((el, index) => {

      let type 

      console.log(el);

      if (el.name === userName)
        type = 1
      else if (el.name === 'anonimo')
        type = 2 
      else
        type = 0

      let diference

      try {
        diference = formatDistance(new Date(el.timestamp),date)
      } catch (error) {

        diference = 'Now'
        console.log(' fecha actual ',date,' fecha timestamp' ,new Date(el.timestamp));
      }

      return <Message key={index} user={el.name} message={el.message} type={type} timestamp={diference}/>
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

export default MessageBox