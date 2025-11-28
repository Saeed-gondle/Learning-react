import { useState } from 'react';
const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendSelected, setFriendSelected] = useState(null);
  function handleAddFriend() {
    setShowAddFriend((show) => !show);
  }
  function handleSetFriend(friend) {
    setFriendSelected((selected) =>
      selected?.id === friend.id ? null : friend
    );
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === friendSelected.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSetFriend}
          selectedFriend={friendSelected}
        />
        {showAddFriend && (
          <FormAddFriend friends={friends} setFriends={setFriends} />
        )}
        <button className="button" onClick={handleAddFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </button>
      </div>
      {friendSelected && (
        <FormSplitBill friend={friendSelected} onSplit={handleSplitBill} />
      )}
    </div>
  );
}
function FriendsList({ friends, onSelection, selectedFriend }) {
  // let friends = [...initialFriends];
  return (
    <ul className="friends-list">
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />

      <h3>{friend.name}</h3>
      <p
        className={`${friend.balance < 0 ? 'red' : friend.balance > 0 ? 'green' : ''}`}
      >
        {friend.balance === 0
          ? `you and ${friend.name} are even`
          : friend.balance > 0
            ? `${friend.name} owes you $${Math.abs(friend.balance)}`
            : `you owe ${friend.name} $${Math.abs(friend.balance)}`}
      </p>
      <button
        className="button"
        type="button"
        onClick={() => onSelection(friend)}
      >
        {isSelected ? 'close' : 'select'}
      </button>
    </li>
  );
}

function FormAddFriend({ onSubmitForm, setFriends }) {
  const [friendName, setFriendName] = useState('');
  const [friendImage, setFriendImage] = useState(
    'https://i.pravatar.cc/48?u=499476'
  );
  function handleAddFriendSubmit(e) {
    e.preventDefault();
    if (!friendName || !friendImage) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: friendName,
      image: `${friendImage}?q=${id}`,
      balance: 0,
    };
    initialFriends.push(newFriend);
    setFriendName('');
    setFriendImage('https://i.pravatar.cc/48?u=499476');
    setFriends((friends) => [...friends, newFriend]);
  }
  return (
    <form className="form-add-friend" onSubmit={handleAddFriendSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={friendImage}
        onChange={(e) => setFriendImage(e.target.value)}
      />
      <button className="button" type="submit">
        Add
      </button>
    </form>
  );
}
function FormSplitBill({ friend, onSplit }) {
  const [bill, setBill] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState('user');
  let paidByFriend = bill - paidByUser;
  function handleSubmit(e) {
    console.log('submitted');
    e.preventDefault();
    onSplit(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />
      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(+e.target.value < bill ? +e.target.value : paidByUser)
        }
      />
      <label>🧍‍♂️ {friend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>💸 Who is paying the bill</label>
      <select onChange={(e) => setWhoIsPaying(+e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <button className="button" type="submit">
        Split bill
      </button>
    </form>
  );
}
