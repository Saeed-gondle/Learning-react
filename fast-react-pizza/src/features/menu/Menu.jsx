import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import Menuitem from "./Menuitem";
function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200">
      {menu.map((pizza) => {
        return <Menuitem key={pizza.id} pizza={pizza} />;
      })}
    </ul>
  );
}
export async function Loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
