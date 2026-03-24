import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="divide-y divide-slate-200 border-b border-stone-200 py-3">
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <UpdateItemQuantity pizzaId={pizzaId}></UpdateItemQuantity>
      <DeleteItem pizzaId={pizzaId}></DeleteItem>
    </li>
  );
}

export default CartItem;
