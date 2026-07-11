import GuestBackground from "@/components/GuestBackground/GustBackground";
import SignUpDialog from "./components/SignUp/SignUpDialog/SignUpDialog";
import { useState } from "react";
import LoginDialog from "./components/Login/LoginDialog/LoginDialog";

const AuthPage = () => {
  const [mode, setMode] = useState<string>("signup");

  const setLoginMode = () => {
    setMode("login");
  };

  const setSignUpMode = () => {
    setMode("signup");
  };

  return (
    <>
      <GuestBackground
        content={
          mode === "signup" ? (
            <SignUpDialog onSwitch={setLoginMode} />
          ) : (
            <LoginDialog onSwitch={setSignUpMode} />
          )
        }
      />
    </>
  );
};

export default AuthPage;
