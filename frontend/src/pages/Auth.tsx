import { useState } from "react";
import Login from "../section/Login";
import SignUp from "../section/SignUp";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
    </div>
  );
}
