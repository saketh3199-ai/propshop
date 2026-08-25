import { Link } from "react-router-dom";
import { Carousel,Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopThreeProductsQuery } from "../slices/productsApiSlice";



const ProductCarousel = ()=>
{
    const {data:products,isLoading,error} = useGetTopThreeProductsQuery()

    const renderCarousel = ()=>
    (
        <Carousel pause='hover' className='bg-primary mb-4'>
                {
                    products.map
                    (
                        (productObject)=>
                        (
                            <Carousel.Item key={productObject._id}>
                                 <Link to={`/product/${productObject._id}`}>
                                    <Image src={productObject.image} alt={productObject.name} fluid />
                                    <Carousel.Caption className='carousel-option'>
                                        <h2>{productObject.name} (${productObject.price})</h2>
                                    </Carousel.Caption>
                                 </Link>
                            </Carousel.Item>
                        )
                    )
                }
        </Carousel>
    )

    const ProductCarouselJsx = 
    isLoading?<Loader /> : error?  <Message variant='danger'>{error}</Message> : renderCarousel()

    return ProductCarouselJsx
}


export default ProductCarousel