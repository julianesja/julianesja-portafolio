import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Portafolio from "./Screen/Portafolio";
import Conciliador from "./Screen/Conciliador";
import PostsScreen from "./Screen/Posts";
import PostDetailScreen from "./Screen/Posts/PostDetail";
import { ThemeProvider } from "./context/ThemeContext";

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
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
