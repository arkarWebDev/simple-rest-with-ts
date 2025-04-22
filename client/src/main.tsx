import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import NoteList from "./components/NoteList.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main.tsx";
import Register from "./pages/Register.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <NoteList />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
