import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './phonebookApi';

export const phoneBook = createSlice({
  name: 'phoneBook',

  initialState: {
    contacts: [],
    filter: '',
    isLoading: false,
    isFetchComplete: false,
    error: null,
  },

  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
        state.isFetchComplete = true;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts = [...state.contacts, action.payload];
        state.isLoading = false;
        state.isFetchComplete = true;
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
        state.isLoading = false;
        state.isFetchComplete = true;
      })

      .addMatcher(isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending), (state, _) => {
        state.error = null;
        state.isLoading = true;
      })

      .addMatcher(isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected), (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isFetchComplete = true;
      });
  },
});
