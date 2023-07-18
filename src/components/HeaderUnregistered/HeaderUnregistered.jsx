import { NavLink } from 'react-router-dom';
import css from './HeaderUnregistered.module.css';

export const HeaderUnregistered = () => {
  return (
    <div className={css.wrapper}>

      <NavLink
        to='/login'
        className={css.navigation}>
        Login
      </NavLink>
      
      <NavLink
        to='/register'
        className={css.navigation}>
        Register
      </NavLink>
   
    </div>
  );
};
