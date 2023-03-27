import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import { RouterProvider } from "react-router";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
