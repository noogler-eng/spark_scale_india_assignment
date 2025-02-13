import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser, login } from "./redux/userSlice";
import axios from "axios";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(loadUser());

    // If token exists, fetch user details from backend
    const fetchUser = async () => {
      if (!localStorage.getItem("token")) return;
      if (!user.email) return;

      try {
        const response = await axios.get("http://localhost:3000/user/getUser", {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        });

        if (!response.data.user) throw new Error("Failed to fetch user");
        console.log(response.data.user);

        const userData = await response.data.user;
        dispatch(
          login({
            id: userData.id,
            email: userData.email,
            isAdmin: userData.isAdmin,
          })
        );
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/add-projects" element={<AddProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
