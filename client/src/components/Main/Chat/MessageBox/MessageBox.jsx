import React from 'react';
import Message from './Message/Message';

const MessageBox = ({ messages, userName }) => {

  // const { isConnected } = useContext(ConectionContext)

  const printMessages = () => {
    // let eventObj = {user:'',message:value}

    return messages.map((el, index) => {

      if (el.name === userName)
        return <Message key={index} user={el.name} message={el.message} type={1} />
      else if (el.name === 'anonimo')
        return <Message key={index} user={el.name} message={el.message} type={2} />
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

export default MessageBox