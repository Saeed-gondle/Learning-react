import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Product from './Pages/product';
import Pricing from './Pages/Pricing';
import PageNotFound from './Pages/PageNotFound';
import HomePage from './Pages/HomePage';
import PageNav from './components/PageNav';
import AppLayout from './Pages/AppLayout';
import Login from './Pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/authContext';
import Form from './components/Form';
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="pricing" element={<Pricing />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate to="cities" replace />}></Route>
              <Route path="cities" element={<CityList />}></Route>
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />}></Route>
              <Route path="form" element={<Form />}></Route>
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
