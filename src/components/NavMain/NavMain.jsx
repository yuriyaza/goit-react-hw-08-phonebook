import { NavLink } from 'react-router-dom';
import css from './NavMain.module.css';

export const NavMain = () => {
  return (
    <div className={css.wrapper}>
      <NavLink to='/' className={css.navItem}>Home</NavLink>
      <NavLink to='/contacts' className={css.navItem}>Contacts</NavLink>
    </div>
  );
};
