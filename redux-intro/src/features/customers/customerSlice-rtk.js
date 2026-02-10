import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  fullName: ``,
  nationalId: '',
  phoneNumber: '',
};
const customerSlice=createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer(state, action) {
      state.fullName = action.payload.fullName;
      state.nationalId = action.payload.nationalId;
      state.phoneNumber = action.payload.phoneNumber;
    },
    updateName(state, action) {
      state.fullName = action.payload.fullName;
    }
  }
})
// function customerReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'customer/createCustomer':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         phoneNumber: action.payload.phoneNumber,
//       };
//     case 'customer/updateName':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//       };
//     default:
//       return state;
//   }
// }

// function createCustomer(fullName, nationalId, phoneNumber) {
//   return {
//     type: 'customer/createCustomer',
//     payload: { fullName, nationalId, createdAt: new Date().toISOString() },
//   };
// }
// function updateName(fullName) {
//   return {
//     type: 'customer/updateName',
//     payload: { fullName },
//   };
// }
export default customerSlice.reducer;
export const { createCustomer, updateName } = customerSlice.actions;
