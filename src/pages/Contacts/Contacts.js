import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { phoneBook } from 'redux/phonebook/slice';
import { Notify } from 'notiflix';

import { fetchContacts, addContact, deleteContact } from 'redux/phonebook/api';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import css from './Contacts.module.css';


Notify.init({ showOnlyTheLastOne: true, clickToClose: true });

export const Contacts = () => {
  const { contacts, filter, error, isLoading } = useSelector(state => state.phoneBook);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) Notify.failure(error);
  }, [error]);

  const onAddContact = newContact => {
    const nameList = contacts.map(contact => contact.name.toLowerCase());

    if (nameList.includes(newContact.name.toLowerCase())) {
      Notify.failure(`${newContact.name} is already in contacts`);
      return;
    }
    dispatch(addContact(newContact));
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const onSetFilter = filter => {
    dispatch(phoneBook.actions.setFilter(filter));
  };

  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className={css.container}>
      <ContactForm onAddContact={onAddContact} />

      <h2 className={css.subtitle}>Your contacts</h2>
      <Filter filter={filter} setFilter={onSetFilter} />

      <ContactList contacts={filteredContacts} onDeleteContact={onDeleteContact} />

    </div>
  );
};
