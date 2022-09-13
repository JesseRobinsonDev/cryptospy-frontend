import Link from "next/link";
import { useState } from "react";

export default function Header(props) {
  const [menuShown, setMenuShown] = useState(false);

  function logoutHandler() {
    localStorage.removeItem("userID");
    props.setUserID(null);
  }

  return (
    <header className="flex flex-col">
      <div className="w-full h-20 bg-stone-900 flex flex-row gap-2 items-center justify-between px-8">
        <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/`}>
          <a className="text-2xl text-white font-light hover:text-green-600 duration-500">
            CryptoSpy
          </a>
        </Link>
        <button
          onClick={() => setMenuShown(!menuShown)}
          className="block md:hidden"
        >
          <img src="/svgs/Burger Menu.svg" className="w-10 h-10" />
        </button>
        <div className="flex-row gap-8 hidden md:flex">
          <ul className="flex flex-row gap-12">
            {props.userID != null && (
              <li>
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITEURL}/user/watchlist`}
                >
                  <a className="text-xl text-white font-light hover:text-green-600 duration-500">
                    Watchlist
                  </a>
                </Link>
              </li>
            )}
            <li>
              <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/exchanges`}>
                <a className="text-xl text-white font-light hover:text-green-600 duration-500">
                  Exchanges
                </a>
              </Link>
            </li>
          </ul>
          {props.userID != null ? (
            <div>
              <button
                onClick={logoutHandler}
                className="bg-red-500 duration-300 hover:bg-red-400 font-semibold text-white text-lg px-2 py-1 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-row gap-1">
              <button
                onClick={() => props.setLoginModal(true)}
                className="bg-green-500 duration-300 hover:bg-green-400 font-semibold text-white text-lg px-2 py-1 rounded-md"
              >
                Login
              </button>
              <button
                onClick={() => props.setRegisterModal(true)}
                className="bg-blue-500 duration-300 hover:bg-blue-400 font-semibold text-white text-lg px-2 py-1 rounded-md"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
      {menuShown && (
        <div className="flex flex-col bg-neutral-800 border-t-2 border-t-neutral-700">
          {props.userID != null && (
            <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/user/watchlist`}>
              <a className="h-12 flex items-center justify-center font-semibold text-white text-lg border-b-2 border-b-neutral-700">
                Watchlist
              </a>
            </Link>
          )}
          <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/exchanges`}>
            <a className="h-12 flex items-center justify-center font-semibold text-white text-lg border-b-2 border-b-neutral-700">
              Exchanges
            </a>
          </Link>
          <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/news`}>
            <a className="h-12 flex items-center justify-center font-semibold text-white text-lg border-b-2 border-b-neutral-700">
              News
            </a>
          </Link>
          {props.userID != null ? (
            <div>
              <button
                onClick={logoutHandler}
                className="h-12 flex items-center justify-center font-semibold text-white text-lg border-b-2 border-b-neutral-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <button
                onClick={() => props.setLoginModal(true)}
                className="h-12 flex items-center justify-center font-semibold text-white text-lg border-b-2 border-b-neutral-700"
              >
                Login
              </button>
              <button
                onClick={() => props.setRegisterModal(true)}
                className="h-12 flex items-center justify-center font-semibold text-white text-lg border-b-2 border-b-neutral-700"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
