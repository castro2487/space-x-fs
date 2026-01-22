"use client";
import {
  useState,
  useEffect,
  createContext,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import axios from "utils/axios";

interface AuthProviderValue {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthProviderValue>({
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = storedToken;
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
      router.push("/");
    }
  }, [token, router]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
