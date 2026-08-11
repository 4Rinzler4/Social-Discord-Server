import Loader from '@/components/Loader/Loader'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import GuestLayout from '@/layouts/GuestLayout/GuestLayout'
import ProfileLayout from '@/layouts/ProfileLayout/ProfileLayout'
import ProtectedLayout from '@/layouts/ProtectedLayout/ProtectedLayout'
import CreatePostPage from '@/pages/CreatePostPage/CreatePostPage'
import { checkAuth } from '@/redux/reducer'
import { Suspense, lazy, useLayoutEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage/AboutPage'))
const GamesPage = lazy(() => import('@/pages/GamesPage/GamesPage'))
const AuthPage = lazy(() => import('@/pages/AuthPage/AuthPage'))

const UserHomePage = lazy(() => import('@/pages/UserHomePage/UserHomePage'))
const UserProfilePage = lazy(
  () => import('@/pages/UserProfilePage/UserProfilePage'),
)
const ProfileSettingsPage = lazy(
  () => import('@/pages/ProfileSettingsPage/ProfileSettingsPage'),
)
const UserDirect = lazy(() => import('@/pages/UserDirect/UserDirect'))

const AppWrapper = () => {
  const checkAuthRef = useRef(false)
  const dispatch = useAppDispatch()
  const { authChecked } = useAppSelector((state) => state.appUser)

  useLayoutEffect(() => {
    if (!checkAuthRef.current) {
      checkAuthRef.current = true
      dispatch(checkAuth())
    }
  }, [dispatch])

  if (!authChecked) {
    return <Loader pageLoading />
  }

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader pageLoading />}>
          <Routes>
            <Route path='/home' element={<HomePage />} />
            {/* Guest Routes */}
            <Route element={<GuestLayout />}>
              <Route path='/about' element={<AboutPage />} />
              <Route path='/games' element={<GamesPage />} />
              <Route path='/auth' element={<AuthPage />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedLayout />}>
              <Route index element={<UserHomePage />} />
              <Route path='profile' element={<ProfileLayout />}>
                <Route path='settings' element={<ProfileSettingsPage />} />
                <Route path=':userId' element={<UserProfilePage />} />
                <Route index element={<UserProfilePage />} />
              </Route>
              <Route path='direct' element={<UserDirect />} />
              <Route path='create-post' element={<CreatePostPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default AppWrapper
