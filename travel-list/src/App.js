import React, { useState } from 'react';
function App() {
  const [items, setItems] = useState([]);
  
  function handleDelete(id) {
    setItems(items => items.filter(item => item.id !== id));
  }
  function handleToggle(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="App">
      <Logo />
      <Form onAdd={setItems} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
      <Stats
        stats={{
          total: items.length,
          packed: items.filter(item => item.packed).length,
          percentage:
            Math.floor(
              (items.filter(item => item.packed).length / items.length) * 100
            ) || 0,
        }}
      />
    </div>
  );
}
function Logo() {
  return <h1 className="logo">🏝️ Far Away 🧳</h1>;
}
function Form({onAdd}) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  function handleSubmit(e) {
    e.preventDefault();   
    const item = {
      id: Date.now(),
      name: description,
      quantity: quantity,
      packed: false,
    };
    onAdd(items => [...items, item]);
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for trip?</h3>
      <select name="quantity" className="select-item" value={quantity} onChange={e => setQuantity(e.target.value)}>
        {Array(20)
          .fill()
          .map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
      </select>
      <input
        type="text"
        className="input-item"
        name="item"
        placeholder="Item..."
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }
        }
      />
      <button className="btn btn-add" type="submit">Add</button>
    </form>
  );
}
function PackingList({items, onDelete, onToggle}) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item key={item.id} item={item} onDelete={onDelete} onToggle={onToggle} />
        ))}
      </ul>
      <div className="actions">
        <select>
          <option value="input">Sort by Input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed</option>
          <option value="unpacked">Sort by Unpacked</option>
        </select>
        <button className="btn btn-clear" onClick={() => onDelete(null)}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item , onDelete, onToggle}) {
  return (
    <li
      className="item"
      style={item.packed ? { textDecoration: 'line-through' } : {}}
    >
      <input type="checkbox" checked={item.packed} onChange={() => onToggle(item.id)} />
      <span className="item-name">
        {item.quantity} {item.name}
      </span>
      <button className="btn btn-remove" onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({stats: { total, packed ,percentage}}) {
  return (
    <footer className="stats">
      💡 You have {total} items on your list, and you already packed {packed} ({ percentage}%).
    </footer>
  );
}
export default App;
