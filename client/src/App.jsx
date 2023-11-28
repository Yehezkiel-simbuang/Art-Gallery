import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import ResetPass from "./pages/ResetPass";
import SignUp from "./pages/SignUp";
import ChangePass from "./pages/ChangePass";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ResetPass />} />
        <Route path="/reset-password/:token" element={<ChangePass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
