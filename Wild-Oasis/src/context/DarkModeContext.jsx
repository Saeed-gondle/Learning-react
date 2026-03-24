import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'darkMode'
  );
  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);
  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, setIsDarkMode, toggleDarkMode }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(
      'useDarkMode must be used within a DarkModeProvider'
    );
  }
  return context;
}
export { DarkModeContext, DarkModeProvider, useDarkMode };
