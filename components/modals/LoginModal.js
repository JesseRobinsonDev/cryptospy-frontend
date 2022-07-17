import { useRef, useState } from "react";
import axios from "axios";

export default function LoginModal(props) {
  const [userNotFound, setUserNotFound] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  function loginHandler(event) {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    axios
      .post(`${process.env.NEXT_PUBLIC_APIURL}/user/login`, {
        username: username,
        pass: password,
      })
      .catch((error) => {
        if (error.response.status == 404) {
          setUserNotFound(true);
        }
        if (error.response.status == 401) {
          setIncorrectPassword(true);
        }
      })
      .then((response) => {
        if (response !== undefined) {
          localStorage.setItem("userID", response.data.user_id);
          props.setUserID(response.data.user_id);
          props.setLoginModal(false);
        }
      });
  }

  function onInputChange() {
    setUserNotFound(false);
    setIncorrectPassword(false);
  }

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-[28rem] h-auto flex flex-col p-4 bg-neutral-800 rounded-xl gap-1">
        <div className="flex flex-row justify-between">
          <span className="text-white text-2xl font-semibold">Login</span>
          <button
            onClick={() => {
              props.setLoginModal(false);
            }}
            className="hover:text-red-500 text-neutral-600 text-xl"
          >
            X
          </button>
        </div>
        <div className="flex flex-row gap-1">
          <span className="text-neutral-400">New to Cryptospy?</span>
          <button
            onClick={() => {
              props.setLoginModal(false);
              props.setRegisterModal(true);
            }}
            className="text-blue-500 hover:text-blue-400 duration-300"
          >
            Register Now!
          </button>
        </div>
        <form onSubmit={loginHandler} className="flex flex-col gap-1">
          <div className="flex flex-col">
            <span className="text-neutral-50 font-semibold">Username</span>
            <input
              onChange={onInputChange}
              type="text"
              ref={usernameRef}
              className="text-white bg-neutral-900 py-3 px-2 rounded-md border-neutral-700 border-[1px] hover:border-blue-600 duration-300 outline-0 focus:border-blue-600"
              placeholder="Enter your username..."
            />
            {userNotFound && (
              <div className="flex flex-row gap-1 items-center">
                <img src="/svgs/Red Alert.svg" className="w-6 h-6" />
                <span className="text-red-500">
                  Account with username not found!
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-neutral-50 font-semibold">Password</span>
            <input
              onChange={onInputChange}
              type="password"
              ref={passwordRef}
              className="text-white bg-neutral-900 py-3 px-2 rounded-md border-neutral-700 border-[1px] hover:border-blue-600 duration-300 outline-0 focus:border-blue-600"
              placeholder="Enter your password..."
            />
            {incorrectPassword && (
              <div className="flex flex-row gap-1 items-center">
                <img src="/svgs/Red Alert.svg" className="w-6 h-6" />
                <span className="text-red-500">Password is incorrect!</span>
              </div>
            )}
          </div>
          <button
            type="submit"
            onClick={loginHandler}
            className="bg-green-500 hover:bg-green-400 text-white font-semibold text-lg rounded-md py-2 duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
