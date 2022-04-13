import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducers from 'reducers';

const configureStore = () => {
  const store = createStore(appReducers, composeWithDevTools());
  return { store };
};

export default configureStore();
