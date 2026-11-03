import { useSidebar } from "@/app/providers/sidebar-provider";

const DashboardPage = () => {
    
    const {toggleSidebar} = useSidebar();
    
    return (
        <>
            <p>kelvin giovanno</p>
            <button className="relative left-100" onClick={() => {toggleSidebar()}}>
                demo
            </button>
        </>
    );
};

export default DashboardPage;