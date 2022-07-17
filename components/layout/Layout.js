import Head from "next/head";
import Header from "./Header";
import { useState, useContext } from "react";
import RegisterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";
import { UserContext } from "../../pages/_app";

export default function Layout(props) {
  const { userID, setUserID } = useContext(UserContext);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  return (
    <main>
      <Head>
        <title>{props.title}</title>
        {props.description != undefined && (
          <meta name="description" content={props.description} />
        )}
      </Head>
      <div className="flex flex-col h-screen">
        <div className="relative">
          {loginModal && (
            <LoginModal
              setUserID={setUserID}
              setLoginModal={setLoginModal}
              setRegisterModal={setRegisterModal}
            />
          )}
          {registerModal && (
            <RegisterModal
              setUserID={setUserID}
              setLoginModal={setLoginModal}
              setRegisterModal={setRegisterModal}
            />
          )}
        </div>
        <div>
          {props.header == undefined && (
            <Header
              userID={userID}
              setUserID={setUserID}
              setLoginModal={setLoginModal}
              setRegisterModal={setRegisterModal}
            />
          )}
        </div>
        <section className="flex flex-grow bg-neutral-900">
          {props.children}
        </section>
      </div>
    </main>
  );
}
