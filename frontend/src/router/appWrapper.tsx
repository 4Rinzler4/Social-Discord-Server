import Loader from "@/components/Loader/Loader";
import AuthPage from "@/pages/AuthPage/AuthPage";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const GuestHomePage = lazy(() => import("@/pages/GuestHomePage/GuestHomePage"));

const AppWrapper = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader pageLoading={true} />}>
          <Routes>
            <Route path="/" element={<GuestHomePage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default AppWrapper;
