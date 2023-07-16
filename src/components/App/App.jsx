import { Routes, Route, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Notify } from 'notiflix';

import { Home } from 'pages/Home/Home';
import { Contacts } from 'pages/Contacts/Contacts';
import { Login } from 'pages/Login/Login';
import { Register } from 'pages/Register/Register';
import { Spinner } from 'components/Spinner/Spinner';
import css from './App.module.css';

Notify.init({ showOnlyTheLastOne: true, clickToClose: true });

export const App = () => {
  const isLoading = useSelector(state => state.phoneBook.isLoading);

  return (
    <div className={css.container}>
      <header className={css.header}>
        <nav className={css.navList}>
          <div>
            <NavLink to='/' className={css.navItem}>Home</NavLink>
            <NavLink to='/contacts' className={css.navItem}>Contacts</NavLink>
          </div>
          <div>
            <NavLink to='/login' className={css.navItem}>Login</NavLink>
            <NavLink to='/register' className={css.navItem}>Register</NavLink>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>

        {isLoading && <Spinner />}
      </main>
    </div>
  );
};
