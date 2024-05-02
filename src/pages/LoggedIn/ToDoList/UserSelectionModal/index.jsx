import React from 'react';
import users from "../../../../data/users.js";
import "./style.scss";

function UserSelectionModal({ onSelect, onClose }) {
  const handleUserSelect = (user) => {
    onSelect(user);
  };

  return (
    <div className="user-selection-modal">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <h2>Select User</h2>
        <ul>
          {users.map( ( user ) => (
            <li key={user.id} onClick={() => handleUserSelect( user )}>
              <b>{user.label}</b>
            </li>
          ) )}
          <li onClick={() => handleUserSelect( null )}>
            Unassigned
          </li>
        </ul>
        <button className='close-button' type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default UserSelectionModal;
