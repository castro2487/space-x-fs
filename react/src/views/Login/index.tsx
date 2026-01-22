"use client";
import { useContext, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import { login } from "api/admin";

export const Login = () => {
  const { setToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await login();
      setToken(token);
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <img
        src="https://www.deptagency.com/wp-content/themes/dept/public/logo-light-new.svg"
        alt="DEPT®"
        title="DEPT®"
        className="mb-5"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button onClick={handleLogin} className="w-[220px] h-[50px] border-none outline-none text-white bg-[#111] cursor-pointer relative z-0 rounded-[10px] hover:text-black hover:before:opacity-100 hover:before:transition-opacity hover:before:duration-300 hover:before:ease-in-out hover:after:bg-transparent" disabled={isLoading}>
        {isLoading ? "LOGGING IN..." : "LOG IN"}
      </button>
    </div>
  );
};
