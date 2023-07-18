import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix';

import { loginUser } from 'redux/auth/authApi';
import css from './FormLogin.module.css';
import { auth } from 'redux/auth/authSlice';

export const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };

    // const userCredentials = {
    //   email: 'aya01@mail.com',
    //   password: '00000000',
    // };

    dispatch(loginUser(userCredentials));
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (!error) return;

    if (error === 'Request failed with status code 400') {
      Notify.failure('Authorization error. Please try other credentials.');
    } else {
      Notify.failure(error);
    }

    dispatch(auth.actions.setError(null));
  }, [error, dispatch]);

  return (
    <form
      className={css.form}
      onSubmit={onFormSubmit}>
      <div className={css.inputWrapper}>
        <label>
          <span className={css.label}>E-mail</span>
          <input
            className={css.input}
            name='email'
            type='email'
            maxLength={40}
            required
            value={email}
            onChange={e => setEmail(e.target.value)}></input>
        </label>
        <label>
          <span className={css.label}>Password</span>
          <input
            className={css.input}
            name='password'
            type='password'
            maxLength={40}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}></input>
        </label>
      </div>

      <button
        className={css.button}
        type='submit'>
        Login
      </button>
    </form>
  );
};
