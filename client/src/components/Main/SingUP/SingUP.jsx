import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import { UserContext } from '../../../context/userContext'

import { useNavigate } from "react-router-dom";

const SingUP = () => {

  const { setLogged } = useContext(UserContext)

  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {

      let user = { name: data.name, email: data.email, password: data.password }

      //peticon api para registro
      const response = await fetch('/users/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      })

      //si respuesta comprobamos si fue exitoso
      if (response) {
        // si creado entonces hacemos login automatico
        if (response.status === 201) {
          setLogged(true)
          navigateTo('/chat')
        } else if (response.status === 400) {
          const res = await response.json()
          if (res.msg.includes('duplicated')) {
            alert('credenciales no validas , usuario ya registrado')
          }else{
            alert('no se pudo registrar')
          }
        } else {
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
        <Button variant="contained" type="submit">SingUp</Button>
      </form>
    </div>
  );
};

export default SingUP;
