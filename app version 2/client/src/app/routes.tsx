import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Scheduler } from "./pages/Scheduler";
import { CreatePost } from "./pages/CreatePost";
import { Accounts } from "./pages/Accounts";
import { Analytics } from "./pages/Analytics";
import { PostDetails } from "./pages/PostDetails";
import { Inbox } from "./pages/Inbox";
import { Settings } from "./pages/Settings";
import { Drafts } from "./pages/Drafts";
import { Layout } from "./components/Layout";
import LandingPage from "./pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "scheduler", Component: Scheduler },
      { path: "create", Component: CreatePost },
      { path: "drafts", Component: Drafts },
      { path: "inbox", Component: Inbox },
      { path: "accounts", Component: Accounts },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
      { path: "post/:id", Component: PostDetails },
    ],
  },
], {
  basename: import.meta.env.BASE_URL || "/",
});
