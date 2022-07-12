import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import modalReducer from './modals';
import userReducer from './users';

export default combineReducers({
  userReducer,
  authReducer,
  modalReducer,
});
