import ProfileHeader from '@/components/ProfileHeader/ProfileHeader'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <>
      <ProfileHeader />
      <Outlet />
    </>
  )
}

export default ProfileLayout
