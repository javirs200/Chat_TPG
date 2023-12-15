import React from "react";
import { Link } from 'react-router-dom'


const Nav = () => {
  return (
    <nav>
        <ul className="nav-bar">
            <li><Link className={'link'} to='/'>Home</Link></li>
            <li><Link className={'link'} to='/chat'>Chat</Link></li>
            <li><Link className={'link'} to='/login'>Login</Link></li>
            <li><Link className={'link'} to='/singUp'>singUp</Link></li>
        </ul >
    </nav >
)
};

export default Nav;