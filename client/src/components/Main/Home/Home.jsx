import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const redirect = (route) => {
    navigate(route);
  }

  return (
    <div className="home">
      <h1>Home</h1>
      <button onClick={()=>{redirect('/chat')}}>GoChat</button>
      <button onClick={()=>{redirect('/login')}}>Login</button>
      <button onClick={()=>{redirect('/singUp')}}>SingUP</button>
    </div>
  );
};

export default Home;
