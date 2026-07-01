import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppWrapper = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback="Loading...">
          <Routes>
            <Route path="/" element={<></>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default AppWrapper;
