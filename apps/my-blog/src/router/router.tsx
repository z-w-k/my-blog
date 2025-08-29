import { createBrowserRouter } from "react-router";
import App from "../App";
import BlogList from "@/components/blog-list/BlogList";
import BlogDetail from "@/components/blog-detail/BlogDetail";
import BlogCreate from "@/components/blog-create/BlogCreate";
import BlogUpdate from "@/components/blog-update/BlogUpdate";

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
      },
      {
        path: "blog/update/:id",
        Component: BlogUpdate
      }
    ]
  },
]);

export default router;
