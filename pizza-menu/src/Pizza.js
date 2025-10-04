function Pizza({ pizzaObj }) {
  return (
    <li className="pizza">
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <h2>{pizzaObj.name}</h2>
      <p>{pizzaObj.ingredients}</p>
      <span>{+pizzaObj.price}</span>
    </li>
  );
}
export default Pizza;
