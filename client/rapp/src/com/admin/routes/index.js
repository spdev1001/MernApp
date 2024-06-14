import React from "react";
const Home = React.lazy(() => import("../home"));
const Products= React.lazy(() => import("../controls/product"));
const Test= React.lazy(() => import("../controls/test"));
const User= React.lazy(() => import("../controls/user"));
const routes = [
    { path: "/admin", exact: true, name: "Home", component: Home },
    { path: "/admin/products", name: "Product", component: Products, model: "product" },
    { path: "/admin/users", name: "User", component: User, model: "user" },
    { path: "/admin/test", name: "Product", component: Test, model: "test" }

]
export default routes;