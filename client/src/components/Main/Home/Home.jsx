import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


const Home = () => {

  const navigateTo = useNavigate();

  const redirect = (route) => {
      navigateTo(route);
  }

  return (
    <div className="home">
      <h1>Home</h1>
      <Button variant="contained" onClick={()=>{redirect('/login')}} >Login</Button>
      <Button variant="contained" onClick={()=>{redirect('/singUp')}} >SingUP</Button>
    </div>
  );
};

export default Home;
