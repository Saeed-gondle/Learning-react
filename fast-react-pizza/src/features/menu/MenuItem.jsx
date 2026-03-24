import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
    

    // dispatch(addItem({ pizzaId: id, name, quantity: 1, unitPrice, totalPrice: unitPrice }));
  }
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  return (
    <li className="flex gap-4 py-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-50 grayscale" : ""}`}
      />
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-medium">{name}</p>
        <p className="text-stone text-sm capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && <UpdateItemQuantity pizzaId={id} />}
          {isInCart && <DeleteItem pizzaId={id} />}
          {!soldOut && !isInCart && (
            <Button
              size="sm"
              type="small"
              onClick={handleAddToCart}
              disabled={soldOut || isInCart}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
