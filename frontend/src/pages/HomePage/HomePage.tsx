import { useAppSelector } from "@/hooks/use-redux";
import GuestHomePage from "../GuestHomePage/GuestHomePage";
import UserHomePage from "../UserHomePage/UserHomePage";

const HomePage = () => {
  const { isAuthenticated } = useAppSelector((state) => state.appUser);
  return isAuthenticated ? <UserHomePage /> : <GuestHomePage />;
};

export default HomePage;
