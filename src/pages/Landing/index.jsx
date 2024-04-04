import {useState} from 'react';
import {useDispatch} from 'react-redux';
import './style.scss';
import {setUsername} from "../../store/slices/authSlice.js";

function Landing () {
    const [inputUsername, setInputUsername] = useState( '' );
    const dispatch = useDispatch();

    const handleInputChange = ( event ) => {
        setInputUsername( event.target.value );
    };

    const saveUsernameInStore = (inputUsername) => {
        dispatch(setUsername( inputUsername ) );
    };

    const saveUsernameInLocalStorage = (inputUsername) => {
        localStorage.setItem("username",inputUsername);
    };

    const handleSetUsername = () => {
        saveUsernameInLocalStorage(inputUsername);
        saveUsernameInStore(inputUsername);
        setInputUsername( '');
    };
    

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            handleSetUsername();
        }
    };

    return (
        <div className="login-card-container">
            <div className="login-card">
                <h2>User Name</h2>
                <div className="login-form">
                    <input
                        type="text"
                        value={inputUsername}
                        onChange={handleInputChange}
                        onKeyUp={handleKeyUp}
                        placeholder="Enter your username"
                        className="input-username"
                    />
                    <button onClick={handleSetUsername} className="button-login">Login</button>
                </div>
            </div>
        </div>
    );
}

export default Landing;
