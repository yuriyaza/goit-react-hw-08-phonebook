import { useState } from 'react';
import css from './AuthLogin.module.css';

export const AuthLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();
  };

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
