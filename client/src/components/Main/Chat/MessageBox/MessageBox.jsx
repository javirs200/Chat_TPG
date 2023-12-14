import React, { useContext } from 'react';
import Message from './Message/Message';
// import { ConectionContext } from '../../../../context/connectionContext';

export function MessageBox({ messages }) {

  // const { isConnected } = useContext(ConectionContext)

  const printMessages = ()=>{
    console.log('Mensajes del server : ', messages);

    // let eventObj = {user:'',message:value}

    return messages.map((el, index) =>{
                <Message key={index} user={el.user} message={el.message}/>
              }
            )
  }

  return (
  
      <div className='MessageBox'>
        <h2>Sala FullStack:</h2>
        <div className='MessagesContainer'>
          {printMessages()}
        </div>
      </div>
      
  );
}