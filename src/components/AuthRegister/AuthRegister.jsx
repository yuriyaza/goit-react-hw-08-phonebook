import { useState } from 'react';
import css from './AuthRegister.module.css';

export const AuthRegister = () => {
  const [login, setLogin] = useState('');
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
          <span className={css.label}>Name</span>
          <input
            className={css.input}
            name='name'
            type='text'
            maxLength={40}
            required
            value={login}
            onChange={e => setLogin(e.target.value)}></input>
        </label>
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
        Register
      </button>
    </form>
  );
};
