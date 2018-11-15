import {combineReducers} from 'redux';
import auth from './auth';
import home from './home';
import course from './course';

export default combineReducers({
  auth,
  home,
  course
});
