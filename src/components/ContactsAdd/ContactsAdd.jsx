import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Notify } from 'notiflix';

import { addContact } from 'redux/phonebook/api';
import css from './ContactsAdd.module.css';

export const ContactsAdd = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(state => state.phoneBook.contacts);
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();

    const newContact = {
      id: uuid(),
      name,
      number,
    };

    const existingContacts = contacts.map(contact => contact.name.toLowerCase());
    if (existingContacts.includes(newContact.name.toLowerCase())) {
      Notify.failure(`${newContact.name} is already exist in your contacts`);
      return;
    }

    dispatch(addContact(newContact));
    setName('');
    setNumber('');
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
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label>
          <span className={css.label}>Number</span>
          <input
            className={css.input}
            name='number'
            type='tel'
            maxLength={20}
            pattern='\+?\d{1,20}?[\-.\s]?\(?\d{0,20}?\)?[\-.\s]?\d{0,20}[\-.\s]?\d{0,20}[\-.\s]?\d{0,20}'
            title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
            required
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
        </label>
      </div>

      <button
        className={css.button}
        type='submit'>
        Add contact
      </button>
    </form>
  );
};
