export default function Item({ item, onDelete, onToggle }) {
  return (
    <li
      className="item"
      style={item.packed ? { textDecoration: 'line-through' } : {}}
    >
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggle(item.id)}
      />
      <span className="item-name">
        {item.quantity} {item.name}
      </span>
      <button className="btn btn-remove" onClick={() => onDelete(item.id)}>
        ❌
      </button>
    </li>
  );
}