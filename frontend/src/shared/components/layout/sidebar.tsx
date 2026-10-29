import { ChevronDown, ChevronsUpDown, LayoutDashboard, ReceiptText, StoreIcon, Warehouse, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router";

const SidebarMenu = ({
    title,
    url,
    Icon,
} : {title: string, url: string,Icon: LucideIcon}) => {
    return (
        <NavLink 
            to={url} 
            className="w-full p-2.5 flex items-center gap-2
                    border border-white rounded-sm hover:bg-gray-200 hover:border-gray-500">
            <Icon size={18} />
            <p className="text-sm">{title}</p>
        </NavLink>
    );
}

const SidebarCollapseMenu = (
    {
        title,
        Icon,
        submenus,
    }: {
        title: string,
        Icon: LucideIcon,
        submenus: {
            title: string,
            url: string,
        }[],
    }
) => {

    const location = useLocation();
    const [openState, setOpenState] = useState(submenus.some(submenu => submenu.url === location.pathname));

    return (
        <div className="rounded-sm">
            <button
                type="button"
                onClick={() => setOpenState(prev => !prev)}
                className="w-full p-2.5 flex items-center gap-4
                           border border-white rounded-sm hover:bg-gray-200 hover:border-gray-500"
            >
                <div className="flex items-center flex-1 gap-2">
                    <Icon 
                        size={18}
                    />
                    <p className="text-sm">{title}</p>
                </div>

                <ChevronDown 
                    size={18}
                    className={`transition-transform duration-300 ${
                        openState ? "rotate-180" : ""
                    }`}
                />

            </button>

            <nav
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openState
                        ? "max-h-60 opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="space-y-2 py-2">
                    {submenus.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.url}
                            className={`block ml-8 p-2.5 rounded-sm
                                       hover:bg-gray-200 cursor-pointer ${location.pathname === item.url && "bg-gray-200"}`}
                        >
                            <p className="text-sm">{item.title}</p>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </div>
    );
};

const SwitchStore = () => {
    

    
    return (
        <div>
            <button className="p-2 flex justify-between items-center border w-full rounded-sm">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-200 rounded-sm">
                        <StoreIcon size={22}/>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-left">Selat Sindo Tractor</p>
                        <p className="text-xs text-left">Super Admin</p>
                    </div>
                </div>
                <ChevronsUpDown  size={18}/>
            </button>
            
        </div>
    )  
}

const Sidebar = () => {

    return (
        <aside className="border-r w-2xs h-screen px-2 py-2 space-y-2">
            <div>
                <SwitchStore />
            </div>
            <div className="space-y-2">
                
                <SidebarMenu title="Dashboard" url="/" Icon={LayoutDashboard}/>

                <SidebarCollapseMenu title={"Sales"} Icon={ReceiptText} submenus={[
                    { title: "Sales list", url: "/sales" },
                    { title: "Sales report", url: "/sales/report" },
                    { title: "Invoices", url: "/sales/invoice" },
                ]} />

                <SidebarCollapseMenu title={"Inventory"} Icon={Warehouse} submenus={[
                    { title: "Sales list", url: "/inventory" },
                    { title: "Sales report", url: "/sales/report" },
                    { title: "Invoices", url: "/sales/invoice" },
                ]} />

            </div>

        </aside>
    );
}

export default Sidebar;