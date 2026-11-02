import Sidebar from "@/shared/components/layout/sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;