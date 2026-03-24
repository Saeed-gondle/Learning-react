import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeItem } from "./cartSlice";
function DeleteItem({pizzaId}) {
   const dispatch =useDispatch();
    return (
      <Button
        type="primary"
        size="small"
        onClick={() => dispatch(removeItem(pizzaId))}
      >
        Remove
      </Button>
    );
}

export default DeleteItem
