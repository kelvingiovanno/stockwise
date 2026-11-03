import { SidebarProvider } from "./providers/sidebar-provider";
import router from "./router";
import { RouterProvider } from "react-router";

function App() {
  return (
    <SidebarProvider>
      <RouterProvider router={router}/>
    </SidebarProvider>
  )
}

export default App;