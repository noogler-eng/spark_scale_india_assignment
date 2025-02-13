import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

export default function Login({
  setIsLogin,
}: {
  setIsLogin: (isLogin: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:3000/auth/login", formData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", "Bearer " + res.data.token);
        dispatch(
          login({
            id: res.data.user.id,
            email: res.data.user.email,
            isAdmin: res.data.user.isAdmin,
          })
        );
        navigate("/home");
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Login
        </button>
      </form>
      <div className="flex items-center gap-2">
        <p>create a new account?</p>
        <button onClick={() => setIsLogin(false)} className="text-blue-500">
          Sign Up
        </button>
      </div>
    </div>
  );
}
