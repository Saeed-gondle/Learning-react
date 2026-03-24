import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseQuantity,
  getCurrentQuantityById,
  increaseQuantity,
} from "./cartSlice";
function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  function handleIncrease() {
    dispatch(increaseQuantity(pizzaId));
  }
  function handleDecrease() {
    dispatch(decreaseQuantity(pizzaId));
  }
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  return (
    <div>
      <Button type="round" onClick={handleIncrease}>
        +
      </Button>
      <span>{currentQuantity}</span>
      <Button type="round" onClick={handleDecrease}>
        -
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
