import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import css from './HeaderNavigation.module.css';

export const HeaderNavigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <div className={css.wrapper}>

      <NavLink
        to='/'
        className={css.navigation}>
        Home
      </NavLink>

      {isLoggedIn && (
        <NavLink
          to='/contacts'
          className={css.navigation}>
          Contacts
        </NavLink>

      )}
    </div>
  );
};
