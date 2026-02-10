import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import accountReducer from './features/account/accountSlice';
import customerReducer from './features/customers/customerSlice';
const routeReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(
  routeReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
  