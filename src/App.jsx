import "./App.css";
import Layout from "./components/Layout";
import ArticleListPage from "./pages/LandingPages/ArticleListPage";
import ArticlePage from "./pages/LandingPages/ArticlePage";
import HomePage from "./pages/LandingPages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";

// New Imports
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AboutPage from "./pages/LandingPages/AboutPage";
import DashLayout from "./components/DashLayout";
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import UsersPage from "./pages/DashboardPages/UsersPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import DashArticleListPage from "./pages/DashboardPages/DashArticleListPage";
import AuthLayout from "./components/AuthLayout";
import { AuthProvider } from "./context/AuthContext";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/articles",
        element: <ArticleListPage />,
      },
      {
        path: "/articles/:id",
        element: <ArticlePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <RegistrationPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "articles",
        element: <DashArticleListPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
