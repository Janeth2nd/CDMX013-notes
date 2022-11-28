import {
    createBrowserRouter,
} from "react-router-dom";

import Home from "./Home.js";
export const routerHome = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);