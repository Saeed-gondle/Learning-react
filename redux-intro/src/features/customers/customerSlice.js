const initialStateCustomer = {
  fullName: ``,
  nationalId: '',
  phoneNumber: '',
};

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        phoneNumber: action.payload.phoneNumber,
      };
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload.fullName,
      };
    default:
      return state;
  }
}

function createCustomer(fullName, nationalId, phoneNumber) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}
function updateName(fullName) {
  return {
    type: 'customer/updateName',
    payload: { fullName },
  };
}
export default customerReducer;
export { createCustomer, updateName };
