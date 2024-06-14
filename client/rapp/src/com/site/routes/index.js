import React from "react";
const Home = React.lazy(() => import("../Pages/home"));
const User = React.lazy(() => import("../Pages/User"));
const routes = [
    { path: "/", exact: true, name: "Home", component: Home },
    {
        path: "/users",
        name: "User",
        component: User,
        model: "user"
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        model: "user"
    }
]
export default routes;