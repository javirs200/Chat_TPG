import React, { useState, useContext } from 'react';
import { socket } from '../../../../config/socket';
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../../../context/userContext';

const Myform = ()=> {

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { logged } = useContext(UserContext);

  const navigateTo = useNavigate();

  const redirect = (route) => {
    navigateTo(route);
  }

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    socket.timeout(2000).emit('clientMessage', value, () => {
      setIsLoading(false);
    });

    event.target['standard-basic'].value = ''
    setValue('')
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get('/users/logout')
      console.log('logout res', res);
      socket.disconnect()
      redirect('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleExit = async () => {
    try {
      socket.disconnect()
      redirect('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='chatControlls'>
      <form onSubmit={onSubmit}>
        <TextField id="standard-basic" label="Mensaje" variant="standard" onChange={handleChange} />
        <Button variant="contained" disabled={isLoading} type="submit">Enviar</Button>
      </form>
      <br />
      {logged ?
        <Button variant="outlined" onClick={() => handleLogout()}>Logout</Button> :
        <Button variant="outlined" onClick={() => handleExit()}>Exit</Button>
      }
    </div>
  );
}

export default Myform