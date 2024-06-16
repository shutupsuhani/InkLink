// store.js
import { createStore, combineReducers } from 'redux';
import AuthReducer from './Context/AuthReducer';


// Combine reducers (if you have more than one)
const rootReducer = combineReducers({
  user: AuthReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
