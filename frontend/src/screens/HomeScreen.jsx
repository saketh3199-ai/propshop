import React from 'react'
// import { useEffect,useState } from 'react'
import {Row,Col} from 'react-bootstrap'
// import products from '../products'
// import axios from 'axios'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import { Link } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'



const HomeScreen = () => 
{
    // const [products,setProducts] = useState([])









    //THE BELOW EFFECT HOOK POPULATES THE STATE-VARIABLE products - STARTS HERE
        // useEffect
        // (
        //     ()=>
        //     {
        //         const fetchProducts = async ()=>
        //         {
        //             const {data} = await axios.get('/api/products')
        //             setProducts(data)
        //         }
        //         fetchProducts()
        //     },[]
        // )
    //THE ABOVE EFFECT HOOK POPULATES THE STATE-VARIABLE products - ENDS HERE

    const {pageNumber,keyword} = useParams()

    const {data,isLoading,error} = useGetProductsQuery({pageNumber,keyword})










    const renderSuccessView = ()=>
    (
        <>
            {keyword && <Link to='/' className='btn btn-light mb-4'>Go Back</Link>}
            {!keyword && <ProductCarousel /> }
            
            <h1>Latest Products</h1>
            <Row>
                {
                    data.products.map
                    (
                        (product) => 
                        {
                            const ProductCol = 
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>

                            return ProductCol
                        }
                    )
                }  

            </Row>
            <Paginate pages={data.pages} page={data.page} keyword={keyword?keyword:''} />
            
        </>
    )



    const HomeScreenElement = 
    <>
        {isLoading?(<Loader />):error?(<Message variant='danger'>{error?.data?.message || error.error}</Message>):(renderSuccessView())}
        
    </>

    return HomeScreenElement
}

export default HomeScreen