import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';


import { useNavigate } from "react-router-dom";

const SingUP = () => {

  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {

    let user = { name: data.name, email: data.email, password: data.password }
    console.log('datos de formulario ', user);

    //api hazme un user
    const res = await axios.post('/users/signup', user)

    try {
      //respuesta de api
      if (res) {

        if (res.status === 201 ) {

          // usar estado logado

          
          console.log('response data', res.data);
          navigateTo('/chat')
        }else{
          // mostrar componente no se pudo registrar ?
        }
      }
    } catch (error) {
      console.log({ msg: error.message });
    }
  }

  return (
    <>
      <h2>SingUP</h2>
      <form id="userForm" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <input type="text" placeholder='Nombre'  {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
          <input type="email" placeholder='Email'  {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
          <input type="pasword" placeholder='Password'  {...register("password", { required: true })} />
          {errors.pasword && <span>This field is required</span>}
        </fieldset>
        <input type="submit" />
      </form>
    </>
  );
};

export default SingUP;
