import { RouterProvider } from "react-router";
import { router } from "./routes/index.jsx";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
