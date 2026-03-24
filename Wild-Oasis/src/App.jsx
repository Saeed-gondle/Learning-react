import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import ProtectedRoutes from './ui/ProtectedRoutes';
import { DarkModeProvider } from './context/DarkModeContext';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route
                  index
                  element={<Navigate replace to='/dashboard' />}
                />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='bookings' element={<Bookings />} />
                <Route
                  path='booking/:bookingId'
                  element={<Booking />}
                />
                <Route
                  path='checkin/:bookingId'
                  element={<Checkin />}
                  errorElement={<PageNotFound />}
                />
                <Route path='cabins' element={<Cabins />} />
                <Route path='users' element={<Users />} />
                <Route path='settings' element={<Settings />} />
                <Route path='account' element={<Account />} />
              </Route>
              <Route path='login' element={<Login />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position='top-center'
            toastOptions={{
              duration: 3000,
              success: { duration: 3000 },
              error: { duration: 3000 },
              styles: {
                fontSize: '1.4rem',
                maxWidth: '500px',
                padding: '16px 24px',
                backgroundColor: 'var(--color-grey-0)',
                color: 'var(--color-grey-700)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              },
            }}
            gutter={12}
            containerStyles={{
              top: '1rem',
              margin: '8px',
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
