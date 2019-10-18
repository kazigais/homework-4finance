import { combineReducers } from 'redux';
import app from './app';
import loan from './loan';
import loanHistory from './loanHistory';

export default combineReducers({
  app,
  loan,
  loanHistory,
});
