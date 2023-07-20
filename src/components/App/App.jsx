import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix';

import { auth } from 'redux/auth/authSlice';
import { fetchUser } from 'redux/auth/authApi';

import { Home } from 'pages/Home/Home';
import { HeaderNavigation } from 'components/HeaderNavigation/HeaderNavigation';
import { HeaderRegistered } from 'components/HeaderRegistered/HeaderRegistered';
import { HeaderUnregistered } from 'components/HeaderUnregistered/HeaderUnregistered';
import { Contacts } from 'pages/Contacts/Contacts';
import { Login } from 'pages/Login/Login';
import { Register } from 'pages/Register/Register';
import { RouteRules } from 'components/RouteRules/RouteRules';
import css from './App.module.css';

Notify.init({ showOnlyTheLastOne: true, clickToClose: true });

export const App = () => {
  const { token, isLoggedIn, isAuthComplete } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    } else {
      dispatch(auth.actions.setIsAuthComplete(true));
    }
  }, [dispatch, token]);

  return (
    isAuthComplete && (
      <>
        <header>
          <div className={css.container}>
            <div className={css.appBar}>
              <nav><HeaderNavigation /></nav>
              {isLoggedIn ? <HeaderRegistered /> : <HeaderUnregistered />}
            </div>
          </div>
        </header>

        <main>
          <div className={css.container}>
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
          </div>
        </main>
      </>
    )
  );
};
