import { Routes, Route, NavLink } from 'react-router-dom';
import css from './Header.module.css';

import { Home } from 'pages/Home/Home';
import { Contacts } from 'pages/Contacts/Contacts';
import { Login } from 'pages/Login/Login';
import { Register } from 'pages/Register/Register';

export const Header = () => {
  return (
    <>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/contacts'>Contacts</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contacts' element={<Contacts />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
