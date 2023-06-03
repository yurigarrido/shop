import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { useRouter } from "next/router"


export default function Product() {
  const { query} = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>
        {/* <Image */}
      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>79,90</span>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto neque, vitae quibusdam officia exercitationem commodi, ut deserunt minima amet optio maiores placeat inventore ab totam odit magnam sint beatae consectetur.</p>

        <button>
          comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}