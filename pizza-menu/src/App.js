import './index.css';
import Pizza from './Pizza';
import pizzaData from './data';
function Header() {
  // style={{
  //   color: 'red',
  //   fontSize: '32px',
  //   textAlign: 'center',
  //   textTransform: 'uppercase',
  // }}
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {pizzaData.map(pizzaObj => {
          return <Pizza key={pizzaObj.name} pizzaObj={pizzaObj} />;
        })}
      </ul>
    </main>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Pizza Menu</p>
    </footer>
  );
}
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
