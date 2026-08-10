import MobileHeroImage from '@/assets/images/mobile-hero.avif'
import type { ReactNode } from 'react'

interface GuestBackgroundProps {
  content: ReactNode
}

const GuestBackground = ({ content }: GuestBackgroundProps) => {
  return (
    <>
      <section className='relative h-screen w-full'>
        <picture className='absolute top-0 left-0 w-full h-full'>
          <img
            src={MobileHeroImage}
            alt='Hero Image'
            className='h-full w-full object-cover object-center brightness-75'
          />
        </picture>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full flex items-center justify-center'>
          {content}
        </div>
      </section>
    </>
  )
}

export default GuestBackground
