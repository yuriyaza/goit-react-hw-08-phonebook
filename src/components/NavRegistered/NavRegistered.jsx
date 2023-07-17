import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';

import { logoutUser } from 'redux/auth/authApi';
import css from './NavRegistered.module.css';

export const NavRegistered = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className={css.wrapper}>
      <FaUserCircle
        className={css.icon}
        color='#900000'
      />
      <span className={css.name}>{user}</span>
      <button
        className={css.button}
        type='button'
        onClick={() => {
          dispatch(logoutUser());
        }}>
        Logout
      </button>
    </div>
  );
};
