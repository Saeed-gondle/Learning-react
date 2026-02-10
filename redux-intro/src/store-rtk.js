import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './features/account/accountSlice-rtk';
import customerReducer from './features/customers/customerSlice-rtk';
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});
export default store;
