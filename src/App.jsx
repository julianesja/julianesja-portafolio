import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Portafolio from "./Screen/Portafolio";
import AccountingTool from "./Screen/AccountingTool";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Portafolio />,
  },
  {
    path: "/accounting_tools",
    element: <AccountingTool />,
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
