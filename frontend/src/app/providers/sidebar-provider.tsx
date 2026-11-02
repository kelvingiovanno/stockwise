import { createContext, useContext, useState, type ReactNode } from "react";

type SidebarContextType = {
    isOpen: boolean;
    toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(
    undefined
);

type SidebarProviderProps = {
    children: ReactNode;
};

export const SidebarProvider = ({children} : SidebarProviderProps) => {
    
    const [isOpen, setOpen] = useState<boolean>(false);
    
    function toggleSidebar() {
        setOpen(!isOpen);
    };
    
    return (
        <SidebarContext.Provider value={{isOpen, toggleSidebar}}>
            {children}
        </SidebarContext.Provider>
    );
}

export const useSidebar = () => {
    
    const ctx = useContext(SidebarContext);

    if(!ctx) {
        throw new Error(
            "useSidebar must be used inside SidebarProvider"
        );
    }

    return ctx;

}