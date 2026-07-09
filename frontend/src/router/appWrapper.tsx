import Loader from "@/components/Loader/Loader";
import { useAppSelector } from "@/hooks/use-redux";
import GuestLayout from "@/layouts/GuestLayout/GuestLayout";
import AboutPage from "@/pages/AboutPage/AboutPage";
import AuthPage from "@/pages/AuthPage/AuthPage";
import GamesPage from "@/pages/GamesPage/GamesPage";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const GuestHomePage = lazy(() => import("@/pages/GuestHomePage/GuestHomePage"));

const AppWrapper = () => {
  const { userId } = useAppSelector((state) => state.appMain);

  console.log(`UserId: ${userId}`);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader pageLoading />}>
          <Routes>
            <Route element={<GuestLayout />}>
              <Route path="/" element={<GuestHomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default AppWrapper;
