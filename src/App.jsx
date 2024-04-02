import {useSelector} from 'react-redux';
import './styling/App.scss';
import LoggedIn from "./pages/LoggedIn/index.jsx";
import Landing from "./pages/Landing/index.jsx";

function App () {
  const username = useSelector( ( state ) => state.auth.username );
  console.log( {username} );

  return (
    <>
      {username ? <LoggedIn/> : <Landing/>}
    </>
  );
}

export default App
