import { useRef, useState } from "react";
import axios from "axios";

export default function RegisterModal(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [passwordSame, setPasswordSame] = useState(true);
  const [passwordLength, setPasswordLength] = useState(true);
  const [usernameLength, setUsernameLength] = useState(true);
  const [userAlreadyUsed, setUserAlreadyUsed] = useState(false);

  // Removed password requirements
  //const [passwordUppercase, setPasswordUppercase] = useState(false);
  //const [passwordLowercase, setPasswordLowercase] = useState(false);
  //const [passwordNumber, setPasswordNumber] = useState(false);
  //const [passwordSpecialChar, setPasswordSpecialChar] = useState(false);
  //const [passwordWhitespace, setPasswordWhitespace] = useState(false);

  function registerHandler(event) {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confPassword = confirmPasswordRef.current.value;
    if (password != confPassword) {
      setPasswordSame(false);
      return;
    }
    if (password.length < 3 || password.length > 16) {
      setPasswordLength(false);
      return;
    }
    if (username.length < 3 || username.length > 16) {
      setUsernameLength(false);
      return;
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_APIURL}/user/register`, {
        username: username,
        pass: password,
      })
      .catch((error) => {
        setUserAlreadyUsed(true);
      })
      .then((response) => {
        if (response !== undefined) {
          localStorage.setItem("userID", response.data.user_id);
          props.setUserID(response.data.user_id);
          props.setRegisterModal(false);
        }
      });
  }

  function onUsernameChange() {
    setUserAlreadyUsed(false);
    if (
      usernameRef.current.value.length < 3 ||
      usernameRef.current.value.length > 16
    ) {
      setUsernameLength(false);
    } else {
      setUsernameLength(true);
    }
  }

  function onPasswordChange() {
    if (
      passwordRef.current.value.length < 3 ||
      passwordRef.current.value.length > 16
    ) {
      setPasswordLength(false);
    } else {
      setPasswordLength(true);
    }
    if (passwordRef.current.value != confirmPasswordRef.current.value) {
      setPasswordSame(false);
    } else {
      setPasswordSame(true);
    }
  }

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-[28rem] h-auto flex flex-col p-4 bg-neutral-800 rounded-xl gap-1">
        <div className="flex flex-row justify-between">
          <span className="text-white text-2xl font-semibold">Register</span>
          <button
            onClick={() => {
              props.setRegisterModal(false);
            }}
            className="hover:text-red-500 text-neutral-600 text-xl"
          >
            X
          </button>
        </div>
        <div className="flex flex-row gap-1">
          <span className="text-neutral-400">Already Have an Account?</span>
          <button
            onClick={() => {
              props.setLoginModal(true);
              props.setRegisterModal(false);
            }}
            className="text-blue-500 hover:text-blue-400 duration-300"
          >
            Login Now!
          </button>
        </div>
        <form onSubmit={registerHandler} className="flex flex-col gap-1">
          <div className="flex flex-col">
            <span className="text-neutral-50 font-semibold">Username</span>
            <input
              onChange={onUsernameChange}
              type="text"
              ref={usernameRef}
              className="text-white bg-neutral-900 py-3 px-2 rounded-md border-neutral-700 border-[1px] hover:border-blue-600 duration-300 outline-0 focus:border-blue-600"
              placeholder="Enter your username..."
            />
            {!usernameLength && (
              <div className="flex flex-row gap-1 items-center">
                <img src="/svgs/Red Alert.svg" className="w-6 h-6" />
                <span className="text-red-500">
                  Username must be between 3 and 16 characters!
                </span>
              </div>
            )}
            {userAlreadyUsed && (
              <div className="flex flex-row gap-1 items-center">
                <img src="/svgs/Red Alert.svg" className="w-6 h-6" />
                <span className="text-red-500">Username already in use!</span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-50 font-semibold">Password</span>
            <input
              onChange={onPasswordChange}
              type="password"
              ref={passwordRef}
              className="text-white bg-neutral-900 py-3 px-2 rounded-md border-neutral-700 border-[1px] hover:border-blue-600 duration-300 outline-0 focus:border-blue-600"
              placeholder="Enter your password..."
            />
            {!passwordLength && (
              <div className="flex flex-row gap-1 items-center">
                <img src="/svgs/Red Alert.svg" className="w-6 h-6" />
                <span className="text-red-500">
                  Password must be between 3 and 16 characters!
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-50 font-semibold">
              Confirm Password
            </span>
            <input
              onChange={onPasswordChange}
              type="password"
              ref={confirmPasswordRef}
              className="text-white bg-neutral-900 py-3 px-2 rounded-md border-neutral-700 border-[1px] hover:border-blue-600 duration-300 outline-0 focus:border-blue-600"
              placeholder="Enter your password..."
            />
            {!passwordSame && (
              <div className="flex flex-row gap-1 items-center">
                <img src="/svgs/Red Alert.svg" className="w-6 h-6" />
                <span className="text-red-500">
                  Passwords must be the same!
                </span>
              </div>
            )}
          </div>
          <button
            type="submit"
            onClick={registerHandler}
            className="bg-green-500 hover:bg-green-400 text-white font-semibold text-lg rounded-md py-2 duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
