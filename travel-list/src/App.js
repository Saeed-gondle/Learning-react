import React, { useState } from 'react';
import Logo from './logo';
import Form from './form';
import PackingList from './packagingList';
import Stats from './stats';
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
  function handleClear() {
    if (window.confirm('Are you sure you want to clear the list?')) {
      setItems([]);
    }
  }
  return (
    <div className="App">
      <Logo />
      <Form onAdd={setItems} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onClear={handleClear}
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

export default App;
