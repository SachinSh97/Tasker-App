import { combineReducers } from 'redux';

import authenticationReducer from 'reducers/authentication';
import taskboardReducers from 'reducers/taskboard';

const appReducers = combineReducers({
  authentication: authenticationReducer,
  taskboard: taskboardReducers,
});

export default appReducers;
