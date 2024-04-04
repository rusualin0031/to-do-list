import { useSelector } from 'react-redux';
import './styling/App.scss';
import LoggedIn from "./pages/LoggedIn/index.jsx";
import Landing from "./pages/Landing/index.jsx";
import React, { useEffect } from "react";
import { setUsername } from "./store/slices/authSlice.js";
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  useEffect(() => {
    const localStorageUsername = localStorage.getItem("username");
    if (localStorageUsername) {
      saveUsernameInStore(localStorageUsername)
    };
  }, []);

  const saveUsernameInStore = (inputUsername) => {
    dispatch(setUsername(inputUsername));
  };

  return (
    <>
      {username ? <LoggedIn /> : <Landing />}
    </>
  );
}

export default App
