import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { ErrorPage, ReviewPage } from "../pages";
import WriteReview from "../pages/WriteReview";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ReviewPage />} />
          <Route path="/review-write" element={<WriteReview />} />
          <Route path="*" element={<ErrorPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
