import Loader from "@/components/Loader/Loader";
import { useAppSelector } from "@/hooks/use-redux";
import AuthPage from "@/pages/AuthPage/AuthPage";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const GuestHomePage = lazy(() => import("@/pages/GuestHomePage/GuestHomePage"));

const AppWrapper = () => {
  const { userId } = useAppSelector((state) => state.appMain);

  console.log(`UserId: ${userId}`);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader pageLoading={true} />}>
          <Routes>
            {userId ? (
              <>
                <Route path="/" element={<GuestHomePage />} />
                <Route path="/auth" element={<AuthPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<GuestHomePage />} />
                <Route path="/auth" element={<AuthPage />} />
              </>
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default AppWrapper;
