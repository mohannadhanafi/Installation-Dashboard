import { combineReducers } from 'redux';

import recent from './recent';
import options from './options';
import trending from './trending';

const rootReducer = combineReducers({
  options,
  trending,
  recent,
});


export default rootReducer;
