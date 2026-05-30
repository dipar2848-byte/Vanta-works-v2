import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AdminChatbot from "./pages/AdminChatbot";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },

  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/admin",
    element: <Admin />
  },

  // 🔥 NEW: Chatbot CRM dashboard
  {
    path: "/admin/chatbot",
    element: <AdminChatbot />
  }
]);