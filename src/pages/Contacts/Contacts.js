// import { useEffect, useRef } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchContacts } from 'redux/phonebook/phonebookApi';

import { ContactsAdd } from 'components/ContactsAdd/ContactsAdd';
import { ContactsFilter } from 'components/ContactsFilter/ContactsFilter';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { ContactsEmpty } from 'components/ContactsEmpty/ContactsEmpty';
import { Spinner } from 'components/Spinner/Spinner';
import css from './Contacts.module.css';

export const Contacts = () => {
  const { contacts, isLoading, isFetchComplete } = useSelector(state => state.phoneBook);
  const isContactsEmpty = contacts.length === 0;
  const dispatch = useDispatch();

  // const isFirstRender = useRef(true);

  useEffect(() => {
    // if (isFirstRender.current) {
    //   isFirstRender.current = false;
    //   return;
    // }

    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <div className={css.wrapper}>
        <ContactsAdd />

        {isFetchComplete && (
          <>
            {isContactsEmpty ? ( <ContactsEmpty /> ) : (
              <>
                <h2 className={css.subtitle}>Your contacts</h2>
                <ContactsFilter />
                <ContactsList />
              </>
            )}
          </>
        )}

      </div>
      {isLoading && <Spinner />}
    </>
  );
};
