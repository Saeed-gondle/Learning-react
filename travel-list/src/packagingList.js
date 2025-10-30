import React, { useState } from 'react';
import Item from './item';
export default function PackingList({ items, onDelete, onToggle, onClear }) {
  const [sortBy, setSortBy] = useState('input');
  // function handleSort(criteria) {
  //   setSortBy(criteria);
  //   onSort(criteria);
  // }
  // function onSort() {
  //   sortedItems = [...items].slice().sort((a, b) => {
  //     if (sortBy === 'packed') {
  //       return Number(a.packed) - Number(b.packed);
  //     }
  //     if (sortBy === 'unpacked') {
  //       return Number(b.packed) - Number(a.packed);
  //     }
  //     return a[sortBy] - b[sortBy];
  //   });
  //   console.log(sortedItems);
  //   return sortedItems;
  // }
  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  if (sortBy === 'unpacked')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item
            key={item.id}
            item={item}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={e => {
            setSortBy(e.target.value);
          }}
        >
          <option value="input">Sort by Input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed</option>
          <option value="unpacked">Sort by Unpacked</option>
        </select>
        <button className="btn btn-clear" onClick={() => onClear()}>
          Clear List
        </button>
      </div>
    </div>
  );
}