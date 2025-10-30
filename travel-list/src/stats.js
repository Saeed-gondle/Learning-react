export default function Stats({ stats: { total, packed, percentage } }) {
  return (
    <footer className="stats">
      💡 You have {total} items on your list, and you already packed {packed} (
      {percentage}%).
    </footer>
  );
}
