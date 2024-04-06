import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import './navbar.scss';

function Navbar() {
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-user">{username}</div>
      <button className="button button__logout" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;