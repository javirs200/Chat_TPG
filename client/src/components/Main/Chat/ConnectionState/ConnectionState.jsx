import React,{useContext} from 'react';
import { ConectionContext } from '../../../../context/connectionContext';
import { UserContext } from '../../../../context/userContext';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import PersonIcon from '@mui/icons-material/Person';
import PersonOffIcon from '@mui/icons-material/PersonOff';


export function ConnectionState() {

  const { isConnected } = useContext(ConectionContext)

  const { logged } = useContext(UserContext);

  return (<>
      {isConnected ? <WifiIcon fontSize="large"/> : <WifiOffIcon fontSize="large"/> }
      {logged ? <PersonIcon fontSize="large"/> : <PersonOffIcon fontSize="large"/> }
  </>);
}