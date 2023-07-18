import { FaRegAddressBook } from 'react-icons/fa';
import css from './ContactsEmpty.module.css';

export const ContactsEmpty = () => {
  return (
    <div className={css.wrapper}>
      <FaRegAddressBook className={css.icon} size={48} />
      <p className={css.title}>Your phonebook is empty</p>
      <p className={css.subtitle}>Please add your first contact</p>
    </div>
  );
};
