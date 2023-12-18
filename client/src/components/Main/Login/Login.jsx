import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import { UserContext } from '../../../context/userContext'

import { useNavigate } from "react-router-dom";

const Login = () => {

  const { setLogged } = useContext(UserContext)

  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {

      //datos del form login
      let user = { email: data.email, password: data.password }

      //peticion api para login con objeto usuario
      const response = await fetch('/users/login',  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      })

      //si respuesta comprobamos si fue exitoso
      if (response) {
        //si ok login correcto
        if (response.status === 200) {
          setLogged(true)
          navigateTo('/chat')
        } else if (response.status === 404) {
          alert('datos de acceso incorrectos , intentelo de nuevo')
        }
      }
    } catch (error) {
      console.log({ msg: error.message });
      alert('login error')
    }
  }

  return (
    <div className='singUp'>
      <h2>Login</h2>
      <form id="userForm" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='fields'>
          <input type="email" placeholder='Email'  {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
          <input type="pasword" placeholder='Password'  {...register("password", { required: true })} />
          {errors.pasword && <span>This field is required</span>}
        </fieldset>
        <br />
        <Button variant="contained" type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;