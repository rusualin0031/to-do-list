import React from 'react';
import users from "../../../../data/users.js";

function UserSelectionModal({ onSelect, onClose }) {
  const handleUserSelect = (user) => {
    onSelect(user);
  };

  return (
    <div className="user-selection-modal">
      <div className="modal-content">
        <h2>Select User</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleUserSelect(user)}>
              {user.label}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default UserSelectionModal;
