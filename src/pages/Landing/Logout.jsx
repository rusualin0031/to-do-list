import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '/authSlice'; 

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
