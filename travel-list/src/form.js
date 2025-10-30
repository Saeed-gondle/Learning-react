import React, { useState } from 'react';
export default function Form({ onAdd }) {
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
      <select
        name="quantity"
        className="select-item"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      >
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
        }}
      />
      <button className="btn btn-add" type="submit">
        Add
      </button>
    </form>
  );
}