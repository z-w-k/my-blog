import { createBrowserRouter } from "react-router";
import App from "../App";
import BlogList from "@/components/blog-list/BlogList";
import BlogDetail from "@/components/blog-detail/BlogDetail";
import BlogCreate from "@/components/blog-create/BlogCreate";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
      {
        index:true,
        Component: BlogList
      },
      {
        path: "blog/:id",
        Component: BlogDetail
      },
      {
        path: "blog/create",
        Component: BlogCreate
      }
    ]
  },
]);

export default router;
