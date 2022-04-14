import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducers from 'reducers';
import { storage } from 'config';
import { getItem, setItem } from 'utils/storage';
import { debouncing } from 'utils/helper';

const persistedState = getItem(storage);

const store = createStore(appReducers, persistedState, composeWithDevTools());

store.subscribe(
  debouncing(() => {
    setItem(storage, store?.getState());
  }, 1000),
);

export default store;
