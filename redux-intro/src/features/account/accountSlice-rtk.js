import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      if (state.loan > 0) return;
      state.balance += action.payload.amount;
      state.loan += action.payload.amount;
      state.loanPurpose = action.payload.purpose;
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };
  return async function (dispatch) {
    dispatch({ type: 'account/loading' });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: 'account/deposit', payload: converted });
  };
}
// function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case 'account/withdraw':
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case 'account/requestLoan':
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case 'account/payLoan':
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: '',
//       };
//     case 'account/loading':
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }
// function deposit(amount, currency) {
//   if (currency === 'USD') return { type: 'account/deposit', payload: amount };
//   return async function (dispatch) {
//     dispatch({ type: 'account/loading' });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;

//     dispatch({ type: 'account/deposit', payload: converted });
//   };
// }
// // https://api.exchangerate.host/latest?base=${currency}&symbols=USD
// function withdraw(amount) {
//   return { type: 'account/withdraw', payload: amount };
// }
// function requestLoan(amount, purpose) {
//   return { type: 'account/requestLoan', payload: { amount, purpose } };
// }

// function payLoan(amount) {
//   return { type: 'account/payLoan' };
// }
// export { deposit, withdraw, requestLoan, payLoan };
// export default accountReducer;
export default accountSlice.reducer;
