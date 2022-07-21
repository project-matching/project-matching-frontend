import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import modal from './modals';
import user from './users';
import validation from './validation';

export default combineReducers({
  user,
  auth,
  modal,
  validation,
});
