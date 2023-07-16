import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix';

import { fetchContacts } from 'redux/phonebook/api';
import { ContactAdd } from 'components/ContactAdd/ContactAdd';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactEmpty } from 'components/ContactEmpty/ContactEmpty';
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
      <ContactAdd />

      {isContactsEmpty ? (
        <ContactEmpty />
      ) : (
        <>
          <h2 className={css.subtitle}>Your contacts</h2>
          <ContactFilter />
          <ContactList />
        </>
      )}

      {isLoading && <Spinner />}
    </div>
  );
};
