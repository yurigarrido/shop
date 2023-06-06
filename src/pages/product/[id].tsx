import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Stripe from "stripe"
import { stripe } from "@/src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { useRouter } from "next/router"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"

interface ProductProps {
    product: {
      id: string,
      name: string,
      imageUrl: string,
      price: string,
      description: string
      defaultPriceId: string
  }
}


export default function Product({product}: ProductProps) {
  const [isCreateCheckoutSession, setIsCreateCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreateCheckoutSession(true)
      const response = await axios.post('/api/checkout', { priceId: product.defaultPriceId})
      const {checkoutUrl} = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreateCheckoutSession(false)
      alert('falha ao redirecionar ao checkout')
    }
  } 


  const { isFallback } = useRouter()

  if( isFallback) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <>
      <Head>
        <title>
          {product.name} | Shop
        </title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={isCreateCheckoutSession} onClick={handleBuyProduct}>
            comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_O0h47hMXMkgn1D' } }
    ],
    fallback: true,
  }
}



export const getStaticProps: GetStaticProps<any, { id: string}> = async ({ params }) => {
  const productId = params?.id || ''
  
  const product = await stripe.products.retrieve(productId, { expand: ['default_price']})
  const price = product.default_price as Stripe.Price

  const formattedProduct = {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount! / 100),
    description: product.description,
    defaultPriceId: price.id
  }

    return {
      props: {
        product: formattedProduct
      },
      revalidate: 60 * 60 * 1 // 1 hour
    }
}