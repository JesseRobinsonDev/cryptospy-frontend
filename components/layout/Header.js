import Link from "next/link";

export default function Header(props) {
  function logoutHandler() {
    localStorage.removeItem("userID");
    props.setUserID(null);
  }

  return (
    <header className="w-full h-20 bg-stone-900 flex flex-row gap-2 items-center justify-between px-8">
      <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/`}>
        <a className="text-2xl text-white font-light hover:text-green-600 duration-500">
          CryptoSpy
        </a>
      </Link>
      <div className="flex flex-row gap-8">
        <ul className="flex flex-row gap-12">
          {props.userID != null && (
            <li>
              <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/user/watchlist`}>
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
          <li>
            <Link href={`${process.env.NEXT_PUBLIC_SITEURL}/news`}>
              <a className="text-xl text-white font-light hover:text-green-600 duration-500">
                News
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
    </header>
  );
}
