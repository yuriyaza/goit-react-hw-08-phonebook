import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createUser, loginUser, logoutUser, fetchUser } from './authApi';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

export const auth = createSlice({
  name: 'auth',

  initialState: {
    user: '',
    email: '',
    token: undefined,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(createUser.fulfilled, loginUser.fulfilled), (state, action) => {
        state.user = action.payload.user.name;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })

      .addMatcher(isAnyOf(logoutUser.fulfilled), (state, _) => {
        state.user = '';
        state.email = '';
        state.token = undefined;
        state.isLoggedIn = false;
        state.isLoading = false;
      })

      .addMatcher(isAnyOf(fetchUser.fulfilled), (state, action) => {
        state.user = action.payload.name;
        state.email = action.payload.email;
        state.isLoggedIn = true;
        state.isLoading = false;
      })

      .addMatcher(isAnyOf(createUser.pending, loginUser.pending, logoutUser.pending, fetchUser.fulfilled), (state, _) => {
        state.error = null;
        state.isLoading = true;
      })

      .addMatcher(isAnyOf(createUser.rejected, loginUser.rejected, logoutUser.rejected, fetchUser.fulfilled), (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

const persistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['token'],
};

export const persistedAuth = persistReducer(persistConfig, auth.reducer);
