import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./container/Home";
import Login from "./container/Login";
import { fetchUser } from "./utils/fetchUser";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = fetchUser();
    if (!user) navigate("login");
  }, [navigate]);
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
