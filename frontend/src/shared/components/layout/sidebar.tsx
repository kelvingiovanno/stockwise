import { ChevronDown, ChevronsUpDown, HelpCircle, ReceiptText, StoreIcon, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";

const SidebarMenu = ({
    title,
    path,
    Icon,
} : {title: string, path: string,Icon: LucideIcon}) => {
    return (
        <NavLink 
            to={path} 
            className="w-full p-2.5 flex items-center gap-4
                        rounded-sm hover:bg-gray-200">
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
            path: string,
        }[],
    }
) => {

    const [openState, setOpenState] = useState(false);
    const location = useLocation();


    if (submenus.some(submenu => submenu.path === location.pathname)) setOpenState(true);

    return (
        <div className="rounded-sm overflow-hidden">
            <button
                type="button"
                onClick={() => setOpenState(prev => !prev)}
                className="w-full p-2.5 flex items-center gap-4
                           rounded-sm hover:bg-gray-200"
            >
                <div className="flex items-center flex-1 gap-2">
                    <ReceiptText size={18} />
                    <p className="text-sm">{title}</p>
                </div>

                <Icon 
                    size={18}
                    className={`transition-transform duration-300 ${
                        openState ? "rotate-180" : ""
                    }`}
                />

            </button>

            {/* Submenu */}
            <nav
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openState
                        ? "max-h-60 opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="space-y-2 pb-2">
                    {submenus.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className="block ml-8 p-2.5 rounded-sm
                                       hover:bg-gray-200 cursor-pointer"
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
                <SidebarCollapseMenu title={"Sales"} Icon={ChevronDown} submenus={[
                    { title: "Sales list", path: "/sales" },
                    { title: "Sales report", path: "/sales/report" },
                    { title: "Invoices", path: "/sales/invoice" },
                ]} />

                <SidebarCollapseMenu title={"Sales"} Icon={ChevronDown} submenus={[
                    { title: "Sales list", path: "/sales" },
                    { title: "Sales report", path: "/sales/report" },
                    { title: "Invoices", path: "/sales/invoice" },
                ]} />

                <SidebarCollapseMenu title={"Sales"} Icon={ChevronDown} submenus={[
                    { title: "Sales list", path: "/sales" },
                    { title: "Sales report", path: "/sales/report" },
                    { title: "Invoices", path: "/sales/invoice" },
                ]} />

                <SidebarMenu title="Help" path="/help" Icon={HelpCircle}/>
            </div>

        </aside>
    );
}

export default Sidebar;