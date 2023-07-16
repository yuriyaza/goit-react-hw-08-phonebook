import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Notify } from 'notiflix';

import { ContactAdd } from 'components/ContactAdd/ContacAdd';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactEmpty } from 'components/ContactEmpty/ContactEmpty';
import css from './Contacts.module.css';

export const Contacts = () => {
  const { contacts, error } = useSelector(state => state.phoneBook);
  const isContactsEmpty = contacts.length === 0;

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
    </div>
  );
};
