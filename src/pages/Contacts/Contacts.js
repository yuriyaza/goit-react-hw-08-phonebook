import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix';

import { fetchContacts } from 'redux/phonebook/phonebookApi';
import { ContactsAdd } from 'components/ContactsAdd/ContactsAdd';
import { ContactsFilter } from 'components/ContactsFilter/ContactsFilter';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { ContactsEmpty } from 'components/ContactsEmpty/ContactsEmpty';
import { Spinner } from 'components/Spinner/Spinner';
import css from './Contacts.module.css';

export const Contacts = () => {
  const { contacts, error, isLoading } = useSelector(state => state.phoneBook);
  const isContactsEmpty = contacts.length === 0;
  const dispatch = useDispatch();

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) Notify.failure(error);
  }, [error]);

  return (
    <div className={css.wrapper}>
      <ContactsAdd />

      {isContactsEmpty ? (
        <ContactsEmpty />
      ) : (
        <>
          <h2 className={css.subtitle}>Your contacts</h2>
          <ContactsFilter />
          <ContactsList />
        </>
      )}

      {isLoading && <Spinner />}
    </div>
  );
};
