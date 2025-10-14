import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";

export const App = () => {
  return (
    <>
      <UserProvider>
        <Toaster richColors />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LogIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};
