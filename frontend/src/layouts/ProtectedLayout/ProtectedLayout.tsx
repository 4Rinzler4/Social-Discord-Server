import AppSidebar from "@/components/AppSideBar/AppSideBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/hooks/use-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.appUser);

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarTrigger className="text-white z-10" />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default ProtectedLayout;
