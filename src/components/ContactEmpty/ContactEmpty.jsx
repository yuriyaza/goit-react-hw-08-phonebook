import { FaRegAddressBook } from 'react-icons/fa';
import css from './ContactEmpty.module.css';

export const ContactEmpty = () => {
  return (
    <div className={css.wrapper}>
      <FaRegAddressBook className={css.icon} size={48}/>
      <p className={css.title}>Your phonebook is empty</p>
      <p className={css.subtitle}>Please add your first contact</p>
    </div>
  );
};
