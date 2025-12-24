import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./views/List";
import Update from "./views/Update";
import Create from "./views/Create";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "./context/modals/Modal";
import Navigation from "./components/Navigation";
import Login from "./views/Login";
import Register from "./views/Register";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";

type View = "Home" | "Update" | "Create" | "Login" | "Register";
type Views = {
  [V in View]: {
    path: string;
    element: React.ReactElement;
    showInHeader: boolean;
    type: "protected" | "guest";
  };
};

export const views: Views = {
  Home: { path: "/", element: <List />, showInHeader: true, type: "protected" },
  Create: {
    path: "/create",
    element: <Create />,
    showInHeader: true,
    type: "protected",
  },
  Update: {
    path: "/update/:carId",
    element: <Update />,
    showInHeader: false,
    type: "protected",
  },
  Login: {
    path: "/login",
    element: <Login />,
    showInHeader: false,
    type: "guest",
  },
  Register: {
    path: "/register",
    element: <Register />,
    showInHeader: false,
    type: "guest",
  },
};

function App() {
  return (
    <BrowserRouter>
      <div className="App tracking-tighter">
        <Navigation />
      </div>

      <ModalProvider>
        <Routes>
          {Object.entries(views).map(([_, view], index) => {
            let element = view.element;

            if (view.type === "protected") {
              element = <ProtectedRoute>{view.element}</ProtectedRoute>;
            } else if (view.type === "guest") {
              element = <GuestRoute>{view.element}</GuestRoute>;
            }

            return <Route key={index} path={view.path} element={element} />;
          })}
        </Routes>
        <Toaster position={"bottom-right"} reverseOrder={false} />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
