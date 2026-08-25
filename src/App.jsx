import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Portafolio from "./Screen/Portafolio";
import Conciliador from "./Screen/Conciliador";
import PostsScreen from "./Screen/Posts";
import PostDetailScreen from "./Screen/Posts/PostDetail";
import LoginScreen from "./Screen/Login";
import AdminScreen from "./Screen/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Portafolio />,
  },
  {
    path: "/posts",
    element: <PostsScreen />,
  },
  {
    path: "/posts/:id",
    element: <PostDetailScreen />,
  },
  {
    path: "/conciliador",
    element: <Conciliador />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminScreen />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

