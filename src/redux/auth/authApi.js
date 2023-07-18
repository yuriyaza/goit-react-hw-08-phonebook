import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const setDefaultToken = token => {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
};

export const createUser = createAsyncThunk('api/createUser', async (newUserCredentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/signup', newUserCredentials);
    setDefaultToken(response.data.token);
    return response.data;
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('api/loginUser', async (userCredentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/login', userCredentials);
    setDefaultToken(response.data.token);
    return response.data;
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('api/logoutUser', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logout');
    setDefaultToken(null);
    return response.data;
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchUser = createAsyncThunk('api/fetchUser', async (token, thunkAPI) => {
  try {
    setDefaultToken(token);
    const response = await axios.get('/users/current', token);
    return response.data;
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
