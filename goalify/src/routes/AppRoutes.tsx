import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";

const Login = lazy(() => import("../components/auth/login"));
const Home = lazy(() => import("../components/home"));
const Register = lazy(() => import("../components/auth/register"));
const View = lazy(() => import("../components/task/view"));

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },   // Corrected to absolute path
  { path: "/register", element: <Register /> },   // Corrected to absolute path
  { path: "*", element: <div>404 - Not Found</div> }, // Fallback for unmatched routes
];

const getPrivateRoutes = () => [{ path: "/task-list", element: <View /> }];

const AppRoutes = () => {
const [isLoading, setIsLoading] = useState(false);
const location = useLocation();

// Set the loading state whenever the route changes
useEffect(() => {
  setIsLoading(true);
  const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate loading time (you can adjust this as needed)
  return () => clearTimeout(timer); // Cleanup on route change
}, [location]);

// const token = false; // Replace with actual token check (e.g., check localStorage or context)
const token = localStorage.getItem('isLoggedIn');
const routes = useRoutes(!token ? publicRoutes : getPrivateRoutes());

return (
  <>
    {isLoading ? (
      <div className="loading-spinner">Loading...</div>
    ) : (
      <Suspense fallback={<div>Loading...</div>}>
        {routes}
      </Suspense>
    )}
  </>
);
};

export default AppRoutes;
