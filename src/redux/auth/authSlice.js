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
    isAuthComplete: false,
    error: null,
  },

  reducers: {
    setIsAuthComplete(state, action) {
      state.isAuthComplete = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(createUser.fulfilled, loginUser.fulfilled), (state, action) => {
        state.user = action.payload.user.name;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })

      .addMatcher(isAnyOf(logoutUser.fulfilled), (state, _) => {
        state.user = '';
        state.email = '';
        state.token = undefined;
        state.isLoggedIn = false;
      })

      .addMatcher(isAnyOf(fetchUser.fulfilled), (state, action) => {
        state.user = action.payload.name;
        state.email = action.payload.email;
        state.isLoggedIn = true;
      })

      .addMatcher(isAnyOf(createUser.pending, loginUser.pending, logoutUser.pending, fetchUser.pending), (state, _) => {
        state.error = null;
        state.isLoading = true;
      })

      .addMatcher(isAnyOf(createUser.fulfilled, loginUser.fulfilled, logoutUser.fulfilled, fetchUser.fulfilled), (state, _) => {
        state.isLoading = false;
        state.isAuthComplete = true;
      })

      .addMatcher(isAnyOf(createUser.rejected, loginUser.rejected, logoutUser.rejected, fetchUser.rejected), (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isAuthComplete = true;
      });
  },
});

const persistConfig = {
  key: 'hw-phonebook-auth',
  storage: storage,
  whitelist: ['token'],
};

export const persistedAuth = persistReducer(persistConfig, auth.reducer);
