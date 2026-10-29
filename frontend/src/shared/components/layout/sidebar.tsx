import { Box, ChartNoAxesCombined, ChevronDown, ChevronsUpDown, LayoutDashboard, ReceiptText, Settings, ShoppingCart, StoreIcon, Truck, Users, Warehouse, type LucideIcon } from "lucide-react";
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
    
    const [open, setOpen] = useState<boolean>(false)
        
    return (
        <div className="relative space-y-2">
            <p className="text-xs text-gray-500">Current Store</p>
            <button 
                className="p-2 flex justify-between items-center border w-full rounded-sm"
                onClick={() => setOpen(!open)}
            >
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
            <div className={`absolute w-3xs max-h-60 left-0 top-24 bg-white p-2 rounded-sm border space-y-2 ${open ? "hidden" : 'block'}`}>
                <p className="text-xs text-gray-500">Stores</p>
                <div className="flex gap-2">
                    <div className="p-2 bg-gray-200 rounded-sm">
                        <StoreIcon size={18} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-left">Selat Sindo Tractor</p>
                        <p className="text-xs text-left">Super Admin</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="p-2 bg-gray-200 rounded-sm">
                        <StoreIcon size={18} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-left">Selat Sindo Tractor</p>
                        <p className="text-xs text-left">Super Admin</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="p-2 bg-gray-200 rounded-sm">
                        <StoreIcon size={18} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-left">Selat Sindo Tractor</p>
                        <p className="text-xs text-left">Super Admin</p>
                    </div>
                </div>
            </div>
        </div>
    )  
}

const Sidebar = () => {

    const store_id = "STORE-001";

    return (
        <aside className="flex flex-col border-r w-2xs h-screen ">
            <div className="p-4">
                <SwitchStore />
            </div>
            <div className="flex-1 px-4 space-y-2 overflow-y-auto ">
                
                <div className="border-t pt-2 ">
                    <SidebarMenu title="Dashboard" url="/" Icon={LayoutDashboard}/>
                </div>

                <div className="space-y-2 py-2">

                    <p className="text-xs text-gray-500">Transactions</p>

                    <SidebarCollapseMenu title={"Sales"} Icon={ShoppingCart} submenus={[
                        { title: "All Sales", url: `/stores/${store_id}/sales`},
                        { title: "Create Sale", url: `/stores/${store_id}/sales/new` },
                        { title: "Returns", url: `/stores/${store_id}/sales/returns` },
                    ]} />

                    <SidebarCollapseMenu title={"Invoice"} Icon={ReceiptText} submenus={[
                        { title: "All Invoices", url: `/stores/${store_id}/invoices`},
                        { title: "Create Invoice", url: `/stores/${store_id}/invoices/new` },
                        { title: "Payments", url: `/stores/${store_id}/invoices/payments` },
                        { title: "Outstanding Invoices", url: `/stores/${store_id}/invoices/outstanding` },
                    ]} />

                    <SidebarCollapseMenu title={"Inventory"} Icon={Box} submenus={[
                        { title: "All Product", url: `/stores/${store_id}/products` },
                        { title: "Stock Level", url: `/stores/${store_id}/inventory/stock-levels` },
                        { title: "Stock Movements", url: `/stores/${store_id}/inventory/movements` },
                        { title: "Stock Adjustments", url: `/stores/${store_id}/inventory/adjustments` },
                        { title: "Stock Transfers", url: `/stores/${store_id}/inventory/transfers` },
                    ]} />

                    <SidebarCollapseMenu title={"Purchasing"} Icon={Truck} submenus={[
                        { title: "All Purchases", url: `/stores/${store_id}/purchases` },
                        { title: "Create Purchases", url: `/stores/${store_id}/purchases/new` },
                        { title: "Suppliers", url: `/suppliers` },
                        { title: "Purchase Returns", url: `/stores/${store_id}/purchases/returns` },
                    ]} />
                </div>
            
                
                <div className="space-y-2 p-y-2">

                    <p className="text-xs text-gray-500">Managements</p>

                    <SidebarCollapseMenu title={"Customers"} Icon={Users} submenus={[
                        { title: "All Customers", url: `/stores/${store_id}/purchases` },
                        { title: "Create Customer", url: `/stores/${store_id}/purchases/new` },
                        { title: "Customer Price Lists", url: `/suppliers` },
                        { title: "Purchase Transactions", url: `/stores/${store_id}/purchases/returns` },
                    ]} />

                    <SidebarCollapseMenu title={"Stores"} Icon={Warehouse} submenus={[
                        { title: "All Stores", url: `/stores/${store_id}/purchases` },
                        { title: "Store Setttings", url: `/stores/${store_id}/purchases/new` },
                    ]} />

                    <SidebarCollapseMenu title={"Reports"} Icon={ChartNoAxesCombined} submenus={[
                        { title: "Sales Reports", url: `/stores/${store_id}/purchases` },
                        { title: "Inventory Reports", url: `/stores/${store_id}/purchases/new` },
                        { title: "Profit & Loss", url: `/stores/${store_id}/purchases/new` },
                        { title: "Purchasing Reports", url: `/stores/${store_id}/purchases/new` },
                    ]} />

                </div>
                <div className="space-y-2 py-2">

                    <p className="text-xs text-gray-500">Systems</p>

                    <SidebarCollapseMenu title={"Settings"} Icon={Settings} submenus={[
                        { title: "Users & Roles", url: `/stores/${store_id}/purchases` },
                        { title: "Product Categories", url: `/stores/${store_id}/purchases/new` },
                        { title: "Unit Of Measurement", url: `/stores/${store_id}/purchases/new` },
                        { title: "Payment Methods", url: `/stores/${store_id}/purchases/new` },
                        { title: "General Settings", url: `/stores/${store_id}/purchases/new` },
                    ]} />

                </div>
            </div>

        </aside>
    );
}

export default Sidebar;