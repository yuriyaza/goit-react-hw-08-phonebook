import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';

import { deleteContact } from 'redux/phonebook/phonebookApi';
import { getRandomColor } from 'js/getRandomColor';
import css from './ContactsList.module.css';

export const ContactsList = () => {
  const { contacts, filter } = useSelector(state => state.phoneBook);
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  const dispatch = useDispatch();

  const onContactDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {filteredContacts.map(({ id, name, number }) => {
        return (
          <li className={css.contactCard} key={id}>
            <div className={css.userIcon} style={{ color: getRandomColor() }}>
              <FaUserCircle />
            </div>

            <div className={css.userInfo}>
              <div className={css.userName}>{name}</div>
              <div>{number}</div>
            </div>

            <button className={css.deleteButton} type='button' onClick={() => onContactDelete(id)}>
              <span className={css.deleteIcon}>
                <BsTrash />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
