import { useState } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { fetchAddress } from "../users/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const totalCartPrice = useSelector(getTotalCartPrice);
  const {
    address,
    username,
    status: addressStatus,
    position,
  } = useSelector((state) => state.user);
  const isAddressLoading = addressStatus === "loading";
  const totalPrice = withPriority
    ? totalCartPrice + totalCartPrice * 0.2
    : totalCartPrice;
  if (cart.length === 0) {
    return (
      <h2>
        Your cart is empty. Please add some pizzas to your cart before placing
        an order.
      </h2>
    );
  }
  const dispatch = store.dispatch;
  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="post" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required className="input" />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required className="input" />
          </div>
        </div>
        <div className="relative">
          <span className="z-50 absolute right-0 top-0 p-4 text-sm text-gray-500">
            <Button
              type="small"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
              disabled={isAddressLoading}
            >
              Get Address
            </Button>
          </span>
          <label>Address</label>
          <div>
            <input
              type="text"
              name="address"
              required
              className="input"
              defaultValue={address}
            />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 transition-all duration-300 focus:ring-yellow-300 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-yellow-300 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="totalPrice" value={totalPrice} />
          <Button disabled={isLoading} type="primary">
            {isLoading ? "Placing order..." : `Order now ${totalPrice}€`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true ",
  };
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
