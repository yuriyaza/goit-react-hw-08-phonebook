import { configureStore } from '@reduxjs/toolkit';
import { phoneBook } from './phonebook/slice';

export const store = configureStore({
  reducer: {
    phoneBook: phoneBook.reducer,
  },
});
