import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    navigate(`/order/${searchQuery}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input"
      />
    </form>
  );
}

export default SearchOrder;
