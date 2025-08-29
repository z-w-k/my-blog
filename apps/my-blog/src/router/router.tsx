import { createBrowserRouter } from "react-router";
import App from "../App";
import BlogList from "@/components/blog-list/BlogList";
import BlogDetail from "@/components/blog-detail/BlogDetail";
import BlogCreate from "@/components/blog-create/BlogCreate";
import BlogUpdate from "@/components/blog-update/BlogUpdate";
import UserLogin from "@/pages/user-login/UserLogin";
import UserRegister from "@/pages/user-register/UserRegister";
import UserReset from "@/pages/user-reset/UserReset";

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
  {
    path: "/user/login",
    Component: UserLogin
  },
  {
    path: "/user/register",
    Component: UserRegister
  },
  {
    path: "/user/reset",
    Component: UserReset
  }
]);

export default router;
