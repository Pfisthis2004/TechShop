import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, Role } from "../types";
import { StorageService } from "../services/storage";
import { AuthAPI } from "../services/api";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (identifier: string, password: string) => Promise<void>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================= Utils ================= */

function parseJwt(token: string): any | null {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(decoded)));
  } catch {
    return null;
  }
}

/* ================= Provider ================= */

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = StorageService.getToken();
    const savedUser = StorageService.getUser();

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const saveSession = (jwt: string) => {
    const payload = parseJwt(jwt) || {};

    const role: Role = payload.role || "USER";
    const email: string = payload.sub || payload.email || "";

    const sessionUser: User = {
      _id: payload.id || payload.sub || "",
      name: payload.name || payload.username || email.split("@")[0],
      email,
      role,
      phone: payload.phone || "",
      address: payload.address || "",
      avatar: payload.avatar || "",
      isActive: payload.isActive ?? true,
    };

    StorageService.setToken(jwt);
    StorageService.setUser(sessionUser);
    setToken(jwt);
    setUser(sessionUser);
  };

  /* ================= LOGIN ================= */

  const login = async (identifier: string, password: string) => {
    setIsLoading(true);
    try {
      const isAdmin = identifier.toLowerCase().includes("admin");
      const apiCall = isAdmin ? AuthAPI.adminLogin : AuthAPI.login;

      const res = await apiCall({ identifier, password });

      if (!res.data?.token) {
        throw new Error("Token không tồn tại");
      }

      saveSession(res.data.token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw err;
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= REGISTER ================= */

  const register = async (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) => {
    setIsLoading(true);
    try {
      const body = {
        username: payload.name ?? payload.email.split("@")[0],
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        address: payload.address,
      };

      await AuthAPI.register(body);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    StorageService.clearAll();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
