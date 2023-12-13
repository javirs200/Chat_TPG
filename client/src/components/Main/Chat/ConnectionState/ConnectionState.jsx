import React,{useContext} from 'react';
import { ConectionContext } from '../../../../context/connectionContext';


export function ConnectionState() {
  const { isConnected } = useContext(ConectionContext)
  return <p>Conection State: { '' + isConnected }</p>;
}