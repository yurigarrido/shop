import { Inter } from 'next/font/google'
import { HomeContainer, Product } from '../styles/pages/home'
import Image from 'next/image'

import camiseta1 from '../assets/camisetas/IgniteLab-T-shirt 1.png'
import camiseta2 from '../assets/camisetas/IgniteLab-T-shirt 1.png'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })
  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      <Product className='keen-slider__slide'>
      <Image src={camiseta1} width={520} height={480} alt=''/>
      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
     </Product>
      <Product className='keen-slider__slide'>
      <Image src={camiseta2} width={520} height={480} alt=''/>
      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 49,90</span>
      </footer>
     </Product>
      <Product className='keen-slider__slide'>
      <Image src={camiseta2} width={520} height={480} alt=''/>
      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 49,90</span>
      </footer>
     </Product>
     <Product className='keen-slider__slide'>
      <Image src={camiseta2} width={520} height={480} alt=''/>
      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 49,90</span>
      </footer>
     </Product>
    </HomeContainer>
  )
}
