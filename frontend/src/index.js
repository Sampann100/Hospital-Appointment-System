import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Authentication/LoginPage";
import SignUp from "./Authentication/Signup";
import RegisterPerson from "./component/RegistorPerson";
import RegisterMemberList from "./component/RegisterMemberList";
import BookAppointment from "./component/BookAppointment";
import ForgotPassword from "../src/Authentication/ForgotPassword.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/RegisterPersonal", element: <RegisterPerson /> },
      { path: "/", element: <RegisterMemberList /> },
      { path: "/Home", element: <RegisterMemberList /> },
      { path: "/Appointment", element: <BookAppointment /> },
    ],
  },
  { path: "/Login", element: <LoginPage /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/forgotPassword", element: <ForgotPassword /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
