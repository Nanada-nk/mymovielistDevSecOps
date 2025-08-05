import { RouterProvider } from "react-router";
import { router } from "./routes/index.jsx";
import { Slide, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        transition={Slide}
        autoClose={3000}
      />
    </>
  )
}

export default App;
