import { useSelector, useDispatch } from 'react-redux';
import { phoneBook } from 'redux/phonebook/phonebookSlice';
import css from './ContactsFilter.module.css';

export const ContactsFilter = () => {
  const filter = useSelector(state => state.phoneBook.filter);
  const dispatch = useDispatch();

  const onFilterChange = filter => {
    dispatch(phoneBook.actions.setFilter(filter));
  };

  return (
    <label className={css.field}>
      <span className={css.label}>Find contacts by name:</span>

      <input
        className={css.input}
        type='text'
        name='filter'
        value={filter}
        onChange={e => {
          onFilterChange(e.target.value);
        }}
      />
    </label>
  );
};
