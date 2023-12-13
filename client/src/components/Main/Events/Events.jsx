import React, { useContext } from 'react';
import { ConectionContext } from '../../../context/connectionContext';

export function Events({ events }) {
  const { isConnected } = useContext(ConectionContext)
  return (
    isConnected ?
      <>
        <h2>Mensajes Desde el server :</h2>
        <ul>
          {
            events.map((event, index) =>
              <li key={index}>{event}</li>
            )
          }
        </ul>
      </>
      : ''
  );
}