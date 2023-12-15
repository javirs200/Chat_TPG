import React, { useState } from 'react';
import { socket } from '../../../../config/socket';
import { TextField,Button } from "@mui/material";

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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


  return (
    <form onSubmit={ onSubmit }>
      <TextField id="standard-basic" label="Mensaje" variant="standard" onChange={handleChange} />
      <Button variant="contained" disabled={isLoading} type="submit">Enviar</Button>
    </form>
  );
}