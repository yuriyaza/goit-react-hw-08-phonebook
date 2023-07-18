import { FaRegAddressBook } from 'react-icons/fa';
import css from './Home.module.css';

export const Home = () => {
  return (
    <div className={css.wrapper}>
      <FaRegAddressBook
        className={css.icon}
        size={60}
      />
      <h1 className={css.header}>Welcome to Phonebook</h1>
      <p className={css.text}>To open your Phonebook please log in.</p>
      <p className={css.text}>If you do not have an account yet, please register.</p>
    </div>
  );
};
