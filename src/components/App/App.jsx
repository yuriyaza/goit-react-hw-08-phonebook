import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix';

import { fetchUser } from 'redux/auth/api';
import { Home } from 'pages/Home/Home';
import { NavMain } from 'components/NavMain/NavMain';
import { NavUnregistered } from 'components/NavUnregistered/NavUnregistered';
import { NavRegistered } from 'components/NavRegistered/NavRegistered';
import { Contacts } from 'pages/Contacts/Contacts';
import { Login } from 'pages/Login/Login';
import { Register } from 'pages/Register/Register';
import css from './App.module.css';

Notify.init({ showOnlyTheLastOne: true, clickToClose: true });

export const App = () => {
  const { token, isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [token, dispatch]);
  
  return (
    <div className={css.container}>
      <header className={css.header}>
        <nav className={css.navList}>
          <NavMain />
          {isLoggedIn ? <NavRegistered /> : <NavUnregistered />}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>
    </div>
  );
};
