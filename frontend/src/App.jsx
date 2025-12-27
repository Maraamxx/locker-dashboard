import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Branches from "./pages/Branches";
import Lockers from "./pages/Lockers";
import LockerDetails from "./pages/LockerDetails";
import ProtectedRoute from "./components/ProtectedRoute";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export { BACKEND_URL };
function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      navigate("/login", { replace: true });
    };

    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Branches />
          </ProtectedRoute>
        }
      />
      <Route
        path="/branch/:branchId"
        element={
          <ProtectedRoute>
            <Lockers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/locker/:lockerId"
        element={
          <ProtectedRoute>
            <LockerDetails />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
