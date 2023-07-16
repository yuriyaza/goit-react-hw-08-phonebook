import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import { persistedAuth } from './auth/slice';
import { phoneBook } from './phonebook/slice';

import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    phoneBook: phoneBook.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
