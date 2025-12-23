import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Branches from "./pages/Branches";
import Lockers from "./pages/Lockers";
import LockerDetails from "./pages/LockerDetails";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
