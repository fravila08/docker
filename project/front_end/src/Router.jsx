import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/RegisterPage";
import App from "./App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
        children: [
            {
                index: true,
                element: <SignUpPage />,
            },
            {
                path: "login",
                element: <LoginPage/>,
            },
            {
                path: "home",
                element:<HomePage/>,
            }
        ],
    },
]);