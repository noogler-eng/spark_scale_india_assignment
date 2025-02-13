import { useState } from "react";
import axios from "axios";

export default function SignUp({
  setIsLogin,
}: {
  setIsLogin: (isLogin: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:3000/auth/signup", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            placeholder="is Admin"
            onChange={(e) =>
              setFormData({ ...formData, isAdmin: e.target.checked })
            }
          />
          <p className="text-sm">are you admin?</p>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Sign Up
        </button>
      </form>
      <div className="flex items-center gap-2">
        <p>are you already have an account?</p>
        <button onClick={() => setIsLogin(true)} className="text-blue-500">
          Login
        </button>
      </div>
    </div>
  );
}
