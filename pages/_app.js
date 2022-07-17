import { createContext, useState, useEffect } from "react";
import "../styles/globals.css";

export const UserContext = createContext();

function MyApp({ Component, pageProps }) {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    setUserID(localStorage.getItem("userID"));
  }, []);

  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
