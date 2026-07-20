import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Home, BadgePlus, User, Send, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import sideBarImg from "@/assets/images/barImg.avif";
import { useLogoutMutation } from "@/services/auth-service";

const AppSideBar = () => {
  const location = useLocation();
  const [logoutUser] = useLogoutMutation();
  const { setOpenMobile } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  const menuItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/direct", icon: Send, label: "Direct" },
    { to: "/create-post", icon: BadgePlus, label: "Create" },
  ];
  return (
    <Sidebar
      collapsible="icon"
      className="bg-black border-r-[20px] border-white"
    >
      <SidebarHeader className="w-full border-b border-white bg-black">
        <div>
          <img
            src={sideBarImg}
            className="hidden group-data-[state=collapsed]:block w-8 h-8"
          />
          <span className="font-semibold text-white group-data-[state=collapsed]:hidden">
            Shade Garden
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-black justify-center">
        <SidebarGroup className="bg-black">
          <SidebarSeparator className="border-white border-1 mb-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(({ to, icon: Icon, label }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    isActive={location.pathname === to}
                    className="!bg-black !rounded-2xl hover:!bg-white"
                  >
                    <Link
                      onClick={() => setOpenMobile(false)}
                      className="w-full flex justify-center p-1 text-white hover:!text-black font-bold gap-2"
                      to={to}
                    >
                      <Icon className="!w-5 !h-5 shrink-0" />
                      <span className="group-data-[state=collapsed]:hidden">
                        {label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarSeparator className="border-white border-1 my-2" />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-black">
        <SidebarContent>
          <SidebarMenu className="mb-8">
            <SidebarMenuItem>
              <SidebarMenuButton className="!bg-black !rounded-2xl hover:!bg-white">
                <Link
                  onClick={() => setOpenMobile(false)}
                  className="w-full flex justify-center p-1 text-white hover:!text-black font-bold gap-2"
                  to="/profile"
                >
                  <User className="!w-5 !h-5 shrink-0" />
                  <span className="group-data-[state=collapsed]:hidden">
                    Profile
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Button
              onClick={handleLogout}
              className="group-data-[state=collapsed]:hidden mt-2 font-bold text-red-400 bg-black"
            >
              <LogOut className="!w-5 !h-5 shrink-0" />
              Log out
            </Button>
          </SidebarMenu>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
