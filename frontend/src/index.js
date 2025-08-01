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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/RegisterPersonal",
        element: <RegisterPerson />,
      },
      {
        path: "/",
        element: <RegisterMemberList />,
      },
      {
        path: "/Home",
        element: <RegisterMemberList />,
      },
      {
        path: "/Appointment",
        element: <BookAppointment />,
      },
    ],
  },
  {
    path: "/Login",
    element: <LoginPage />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
