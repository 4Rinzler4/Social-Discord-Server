import GuestBackground from '@/components/GuestBackground/GustBackground'
import { TypographyP } from '@/components/ui/typography'
import { HiArrowUpRight } from 'react-icons/hi2'

const AboutPage = () => {
  const content = (
    <>
      <div>
        <TypographyP className='text-[15px] md:text-[18px] text-white'>
          Join us
        </TypographyP>
        <HiArrowUpRight className='size-5' />
      </div>
    </>
  )

  return (
    <>
      <GuestBackground content={content} />
    </>
  )
}

export default AboutPage
