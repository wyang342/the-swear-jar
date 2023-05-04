import "./App.css";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

// Import Pages
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import MyAccountPage from "./pages/MyAccountPage";
import TopAppBar from "./components/TopAppBar";
import EditProfilePage from "./pages/EditProfilePage";
import CreateJarPage from "./pages/jars/CreateJarPage";

// App == Routes
function App() {
  return (
    <>
      <TopAppBar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="auth/change-password"
          element={
            <RequireAuth>
              <ChangePasswordPage />
            </RequireAuth>
          }
        />
        <Route
          path="my-account"
          element={
            <RequireAuth>
              <MyAccountPage />
            </RequireAuth>
          }
        />
        <Route
          path="my-account/edit-profile"
          element={
            <RequireAuth>
              <EditProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="jars/new"
          element={
            <RequireAuth>
              <CreateJarPage />
            </RequireAuth>
          }
        />

        <Route path="auth/signup" element={<SignupPage />} />
        <Route path="auth/signin" element={<SigninPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
