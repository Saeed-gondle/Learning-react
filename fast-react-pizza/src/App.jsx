import {
  createBrowserRouter,
  Router,
  RouterProvider,
  useNavigation,
} from 'react-router-dom';
import Home from './ui/Home';
import Menu, { Loader as menuLoader } from './features/Menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder,{action as createOrderAction} from './features/order/CreateOrder';
import Order, { Loader as OrderLoader } from './features/order/Order';
import {action as UpdateOrderAction} from './features/order/UpdateOrder';
import Applayout from './ui/Applayout';
import Error from './ui/Error';
const router = createBrowserRouter([
  {
    element: <Applayout />,
 
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction 
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: OrderLoader,
        action: UpdateOrderAction,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
