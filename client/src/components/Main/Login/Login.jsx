import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  
  return (
    <>
    <h2>Login</h2>
    <form id="userForm"></form>
    </>
  );
};

export default Login;
