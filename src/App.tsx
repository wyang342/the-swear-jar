import "./App.css";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

// Import Pages
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import MyAccountPage from "./pages/account/MyAccountPage";
import TopAppBar from "./components/TopAppBar";
import EditProfilePage from "./pages/account/EditProfilePage";
import CreateJarPage from "./pages/home/CreateJarPage";
import JarPage from "./pages/jar/JarPage";
import MembersPage from "./pages/jar/MembersPage";

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
        <Route
          path="jars/:jarId"
          element={
            <RequireAuth>
              <JarPage />
            </RequireAuth>
          }
        />
        <Route
          path="jars/:jarId/members"
          element={
            <RequireAuth>
              <MembersPage />
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
