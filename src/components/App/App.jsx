import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix';

import { fetchUser } from 'redux/auth/authApi';
import { RouteRules } from 'components/RouteRules/RouteRules';

import { Home } from 'pages/Home/Home';
import { HeaderNavigation } from 'components/HeaderNavigation/HeaderNavigation';
import { HeaderRegistered } from 'components/HeaderRegistered/HeaderRegistered';
import { HeaderUnregistered } from 'components/HeaderUnregistered/HeaderUnregistered';
import { Contacts } from 'pages/Contacts/Contacts';
import { Login } from 'pages/Login/Login';
import { Register } from 'pages/Register/Register';
import css from './App.module.css';

import { useRef } from 'react';
import { fetchContacts } from 'redux/phonebook/phonebookApi';
import { Spinner } from 'components/Spinner/Spinner';

import { auth } from 'redux/auth/authSlice';

Notify.init({ showOnlyTheLastOne: true, clickToClose: true });

export const App = () => {
  const { token, isLoggedIn, isAuthComplete } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (token) {
      dispatch(fetchUser(token));
    } else {
      dispatch(auth.actions.setIsAuthComplete(true));
    }
  }, [dispatch, token]);

  return (
    <>
      {isAuthComplete && (
        <div className={css.container}>
          <header className={css.header}>
            <nav>
              <HeaderNavigation />
            </nav>
            {isLoggedIn ? <HeaderRegistered /> : <HeaderUnregistered />}
          </header>

          <main>
            <Routes>
              <Route
                path='/'
                element={
                  <RouteRules
                    component={<Home />}
                    type='public'
                    onDeniedRedirect='/'
                  />
                }
              />

              <Route
                path='/contacts'
                element={
                  <RouteRules
                    component={<Contacts />}
                    type='private'
                    onDeniedRedirect='/login'
                  />
                }
              />

              <Route
                path='/login'
                element={
                  <RouteRules
                    component={<Login />}
                    type='restricted'
                    onDeniedRedirect='/contacts'
                  />
                }
              />

              <Route
                path='/register'
                element={
                  <RouteRules
                    component={<Register />}
                    type='restricted'
                    onDeniedRedirect='/contacts'
                  />
                }
              />
            </Routes>
          </main>
        </div>
      )}
    </>
  );
};
