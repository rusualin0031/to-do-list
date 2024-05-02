import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import {logout} from "../../../store/slices/authSlice.js";

function Navbar() {
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
< Filter-tasks-by-assigned-user/TDLAR-19
      <img className="logo" src="src/assets/logo-company.png"></img>
> main
      <div className="navbar-user">{username}</div>
      <button className=" button__logout" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;