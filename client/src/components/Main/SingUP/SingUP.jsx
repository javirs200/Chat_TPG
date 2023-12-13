import React from "react";
import { useForm } from "react-hook-form";

const SingUP = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {

  }
  
  return (
    <>
    <h2>SingUP</h2>
    <form id="userForm"  onSubmit={handleSubmit(onSubmit)}>
    <fieldset>
        <label {...register("name")} >Id numero:</label>
        <input type="text" placeholder='Nombre'  {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
        <label {...register("password")} >Id numero:</label>
        <input type="pasword" placeholder='Password'  {...register("password", { required: true })} />
        {errors.pasword && <span>This field is required</span>}
      </fieldset>
    </form>
    </>
  );
};

export default SingUP;
