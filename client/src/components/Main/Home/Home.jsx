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
      <h1>Chat TPG</h1>
      <img src="/logo512.png" alt="Chat TPG" />
      <Button variant="contained" onClick={() => { redirect('/login') }} >Login</Button>
      <br />
      <Button variant="contained" onClick={() => { redirect('/singUp') }} >SingUP</Button>
    </div>
  );
};

export default Home;
