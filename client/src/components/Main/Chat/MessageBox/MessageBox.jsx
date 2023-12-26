import React, { useEffect,useRef } from 'react';
import Message from './Message/Message';
import { formatDistance } from "date-fns";

const MessageBox = ({ messages, userName, date }) => {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const printMessages = () => {
    // let eventObj = {user:'',message:value}

    return messages.map((el, index) => {

      let type

      if (el.name === userName)
        type = 1
      else if (el.name === 'anonimo')
        type = 2
      else
        type = 0

      let diference

      try {
        diference = formatDistance(new Date(el.timestamp), date)
      } catch (error) {
        diference = 'Now'
      }

      return <Message key={index} user={el.name} message={el.message} type={type} timestamp={diference} />
    })
  }

  return (

    <div className='MessageBox'>
      <h2>Sala FullStack:</h2>
      <div className='MessagesContainer'>
        {messages ? printMessages() : ''}
        <div ref={messagesEndRef} />
      </div>
    </div>

  );
}

export default MessageBox