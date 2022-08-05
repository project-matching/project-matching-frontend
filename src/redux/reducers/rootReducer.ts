import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import modal from './components/modals';
import validation from './components/validation';
import user from './users';

export default combineReducers({
  user,
  auth,
  modal,
  validation,
});
