import { useState } from "react";
import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="hidden font-bold text-stone-600 sm:block">{username}</div>
  );
}

export default Username;
