import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartItems, getTotalCartPrice } from "./cartSlice";

function CartOverview() {
  const numItems = useSelector(getTotalCartItems);
  const price = useSelector(getTotalCartPrice);
  if(numItems === 0) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 px-4 py-4 text-stone-200 sm:px-6 md:text-base lg:px-8">
      <p className="space-x-4 font-semibold uppercase text-stone-300 ">
        <span>{numItems} pizzas</span>
        <span>${price.toFixed(2)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
