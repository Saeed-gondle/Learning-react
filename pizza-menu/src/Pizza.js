function Pizza({ pizzaObj }) {
  return (
    <div className="pizza">
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <h2>{pizzaObj.name}</h2>
      <p>{pizzaObj.ingredients}</p>
      <span>{+pizzaObj.price}</span>
    </div>
  );
}
export default Pizza;
