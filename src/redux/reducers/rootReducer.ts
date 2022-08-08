import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import modal from './components/modals';
import validation from './components/validation';
import post from './post/post';
import user from './users';

export default combineReducers({
  user,
  auth,
  modal,
  validation,
  post,
});
