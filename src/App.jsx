import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Portafolio from './Screen/Portafolio';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Portafolio />,
  }
]);

function App() {
  return (
    <> 
      <RouterProvider router={router} />
    </>
  )
}

export default App
