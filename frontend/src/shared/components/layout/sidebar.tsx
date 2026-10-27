import { ChevronDown, ReceiptText } from "lucide-react";

const SidebarMenu = () => {
    return (
        <div>
            
        </div>
    );
}

const SidebarCollapseMenu = () => {
    return (
        <div>
            <div className="w-full h-12 p-2 border border-white flex items-center gap-4 hover:bg-gray-200 hover:border-gray-500">
                <div className="flex items-center flex-1">
                    <ReceiptText />
                    <p className="text-sm">Sale</p>
                </div>
                <ChevronDown />
            </div>
            <div>

            </div>
        </div>
    );
} 

const Sidebar = () => {
    return (
        <aside className="border-r-1 w-2xs h-screen px-2 py-2">
            <SidebarCollapseMenu />
        </aside>
    );
}

export default Sidebar;