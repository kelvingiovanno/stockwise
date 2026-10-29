import { createBrowserRouter } from "react-router";

import DashboardLayout from "./layouts/dashboard.layout";

import SignInPage from "./features/sign-in/pages/signin.pages";
import DashboardPage from "./features/dashboard/pages/dashboard.pages";
import SalesListPage from "./features/sales/pages/sales-list.pages";
import InventoryListPage from "./features/inventory/pages/inventory-list.pages";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'sales',
                element: <SalesListPage />
            },
            {
                path: 'inventory',
                element: <InventoryListPage />
            },
        ],
    },
    {
        path: '/sign-in',
        element: <SignInPage />
    }
])

export default router;