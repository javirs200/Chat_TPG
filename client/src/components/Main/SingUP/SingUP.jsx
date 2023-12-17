import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Button } from "@mui/material";

import { UserContext } from '../../../context/userContext'

import { useNavigate } from "react-router-dom";

const SingUP = () => {

  const { setLogged } = useContext(UserContext)

  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {

      let user = { name: data.name, email: data.email, password: data.password }
      console.log('datos de formulario ', user);

      //api hazme un user
      const res = await axios.post('/users/signup', user)

      console.log('axios data res', res);
      //respuesta de api
      if (res) {
        if (res.status === 201) {

          // usar context logged
          setLogged(true)
          console.log('response data', res.data);

          navigateTo('/chat')
        } else {
          //use state error
          // mostrar componente no se pudo registrar ?
          alert('no se pudo registrar')
        }
      }
    } catch (error) {
      console.log({ msg: error.message });
      alert('no se pudo registrar')
    }
  }

  return (
    <div className='singUp'>
      <h2>SingUP</h2>
      <form id="userForm" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='fields'>
          <input type="text" placeholder='Nombre'  {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
          <input type="email" placeholder='Email'  {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
          <input type="pasword" placeholder='Password'  {...register("password", { required: true })} />
          {errors.pasword && <span>This field is required</span>}
        </fieldset>
        <br />
        <Button variant="contained" input type="submit">SingUp</Button>
      </form>
    </div>
  );
};

export default SingUP;
