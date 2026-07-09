import GuestHeader from "@/components/GuestHeader/GuestHeader";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <>
      <GuestHeader />
      <Outlet />
    </>
  );
};

export default GuestLayout;
