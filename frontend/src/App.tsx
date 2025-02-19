import { Route, Routes } from "react-router";
import "./App.css";
import AuditPage from "./components/AuditPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/audits" element={<AuditPage />} />
      </Routes>
    </>
  );
}

export default App;
