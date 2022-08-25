import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import modal from './components/modals';
import validation from './components/validation';
import post from './post/post';
import recruitedProjects from './projects/recruitedProjects';
import recruitingProjects from './projects/recruitingProjects';
import user from './users';

export default combineReducers({
  user,
  auth,
  modal,
  validation,
  post,
  recruitingProjects,
  recruitedProjects,
});
