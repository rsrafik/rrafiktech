import { createBrowserRouter } from "react-router";
import { HomePage } from "./components/HomePage";
import { PortfolioLayout } from "./components/PortfolioLayout";
import { NotFoundLayout } from "./components/NotFoundLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/portfolio",
    Component: PortfolioLayout,
  },
  {
    path: "/projects",
    Component: NotFoundLayout,
  },
  {
    path: "*",
    Component: NotFoundLayout,
  },
]);