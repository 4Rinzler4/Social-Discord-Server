import GuestBackground from "@/components/GuestBackground/GustBackground";

import SignUpDialog from "./components/SignUp/SignUpDialog/SignUpDialog";

const AuthPage = () => {
  return (
    <>
      <GuestBackground content={<SignUpDialog />} />
    </>
  );
};

export default AuthPage;
