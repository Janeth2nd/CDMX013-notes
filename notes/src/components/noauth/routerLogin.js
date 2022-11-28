import {
    createBrowserRouter,
} from "react-router-dom";

import Login from "./Login.js";

export const routerLogin = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,

    },
]);