import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Portafolio from "./Screen/Portafolio";
import Conciliador from "./Screen/Conciliador";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Portafolio />,
  },
  {
    path: "/conciliador",
    element: <Conciliador />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
