import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
