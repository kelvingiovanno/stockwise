import { createBrowserRouter } from "react-router";
import SignInPage from "./features/sign-in/pages/signin.pages";
import DashboardLayout from "./layouts/dashboard.layout";
import DashboardPage from "./features/dashboard/pages/dashboard.pages";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
        ],
    },
    {
        path: '/sign-in',
        element: <SignInPage />
    }
])

export default router;