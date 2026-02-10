import { createContext, useReducer, useContext } from 'react';
const AuthContext = createContext();
const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};
function AuthProvider({ children }) {
  const initialState = {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).user
      : null,
    isAuthenticated: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).isAuthenticated
      : false,
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'login':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
        };
      case 'logout':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  }
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER });
      localStorage.setItem(
        'user',
        JSON.stringify({ ...FAKE_USER, isAuthenticated: true })
      );
    }
  }
  function logout() {
    localStorage.removeItem('user');
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
export { AuthProvider, useAuth };
