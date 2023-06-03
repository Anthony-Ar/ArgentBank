import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import User from "./pages/User";

export const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/sign-in',
            element: <SignIn />
        },
        {
            path: '/user',
            element: <User />
        },
        {
            path: '*',
            element: <Home />
        }
    ]);
}