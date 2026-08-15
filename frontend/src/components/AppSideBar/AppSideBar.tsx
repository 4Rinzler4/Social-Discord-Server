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
} from '@/components/ui/sidebar'
import { Home, BadgePlus, User, Send, LogOut, Settings } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import sideBarImg from '@/assets/images/barImg.avif'
import { useLogoutMutation } from '@/services/authService'
import { useTranslation } from 'react-i18next'

const AppSideBar = () => {
  const location = useLocation()
  const [logoutUser] = useLogoutMutation()
  const { setOpenMobile } = useSidebar()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap()
      navigate('/home', { replace: true })
    } catch (error) {
      console.error(error)
    }
  }
  const menuItems = [
    { to: '/', icon: Home, label: t('common.userLabels.home') },
    { to: '/direct', icon: Send, label: t('common.userLabels.direct') },
    {
      to: '/create-post',
      icon: BadgePlus,
      label: t('common.userLabels.create'),
    },
    {
      to: '/profile/settings',
      icon: Settings,
      label: t('common.userLabels.settings'),
    },
  ]

  const profileItem = {
    to: '/profile',
    icon: User,
    label: t('common.userLabels.profile'),
  }

  return (
    <Sidebar collapsible='icon' className='bg-black'>
      <SidebarHeader className='w-full border-b border-white bg-black'>
        <div>
          <img
            src={sideBarImg}
            className='hidden group-data-[state=collapsed]:block w-8 h-8'
          />
          <span className='font-semibold text-white group-data-[state=collapsed]:hidden'>
            Shade Garden
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className='bg-black justify-center'>
        <SidebarGroup className='bg-black'>
          <SidebarSeparator className='border-white border-1 mb-2' />
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(({ to, icon: Icon, label }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    isActive={location.pathname === to}
                    className={`!p-0 transition-colors duration-150 ${
                      location.pathname === to
                        ? '!bg-white !text-black'
                        : '!bg-black !text-white hover:!bg-white hover:!text-black'
                    }
                  `}
                  >
                    <Link
                      onClick={() => setOpenMobile(false)}
                      className='w-full flex justify-center p-1 font-bold gap-2'
                      to={to}
                    >
                      <Icon className='!w-5 !h-5 shrink-0' />
                      <span className='group-data-[state=collapsed]:hidden'>
                        {label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarSeparator className='border-white border-1 my-2' />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-black'>
        <SidebarContent>
          <SidebarMenu className='mb-8'>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={location.pathname === profileItem.to}
                className={`!p-0 transition-colors duration-150 ${
                  location.pathname === profileItem.to
                    ? '!bg-white !text-black'
                    : '!bg-black !text-white hover:!bg-white hover:!text-black'
                } `}
              >
                <Link
                  onClick={() => setOpenMobile(false)}
                  className='w-full flex justify-center p-1 font-bold gap-2'
                  to={profileItem.to}
                >
                  <User className='!w-5 !h-5 shrink-0' />
                  <span className='group-data-[state=collapsed]:hidden'>
                    {profileItem.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <Button
              onClick={handleLogout}
              className='group-data-[state=collapsed]:hidden mt-2 font-bold text-red-400 bg-black'
            >
              <LogOut className='!w-5 !h-5 shrink-0' />
              Log out
            </Button>
          </SidebarMenu>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSideBar
