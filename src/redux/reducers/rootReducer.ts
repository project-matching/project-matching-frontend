import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';

import modal from './components/modals';
import validation from './components/validation';

import loadPosition from './position/loadPosition';
import createProject from './post/create/createProject';
import loadProject from './post/load/loadProject';
import loadTech from './tech/loadTech';

import user from './users';

export default combineReducers({
  user,
  auth,
  modal,
  validation,
  createProject,
  loadProject,
  loadPosition,
  loadTech,
});
