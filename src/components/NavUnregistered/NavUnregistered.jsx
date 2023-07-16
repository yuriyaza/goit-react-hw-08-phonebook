import { NavLink } from 'react-router-dom';
import css from './NavUnregistered.module.css';

export const NavUnregistered = () => {
  return (
    <div className={css.wrapper}>
      <NavLink to='/login' className={css.navItem}>Login</NavLink>
      <NavLink to='/register' className={css.navItem}>Register</NavLink>
    </div>
  );
};
