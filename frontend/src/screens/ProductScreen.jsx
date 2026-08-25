import React from 'react'
 import { useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
// import axios from 'axios'
// import products from '../products' 
import { useGetProductDetailsQuery,useMakeReviewMutation } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSelector,useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'
import {toast} from 'react-toastify'
import Meta from '../components/Meta'

const ProductScreen = () => 
{


    const {id:productId} = useParams()
    const [qty,setQty] = useState(1)
    const [rating,setRating] = useState(0)
    const [comment,setComment] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [product,setProducts] = useState({})

     

    // useEffect
    // (
    //     ()=>
    //     {
    //         const FetchProduct = async ()=>
    //         {
    //             const {data} = await axios.get(`/api/products/${id}`)
    //             setProducts(data)
    //         }
    //         FetchProduct()
    //     },[id]
    // )

    

    const {data:product,error,isLoading,refetch} = useGetProductDetailsQuery(`/${productId}`)
    const [review,{isLoading:loadingProductReview}] = useMakeReviewMutation()

    const {userInfo} = useSelector((state)=>state.auth)
    
    const addToCartHandler = ()=>
    {
        dispatch(addToCart({...product,qty}))
        navigate('/cart') // replacement of history.push/replace
    }





    const renderQtySelection = ()=>
    (
        <ListGroup.Item>
            <Row>
                <Col>qty</Col>

                    <Col>
                        <Form.Control as='select' value={qty} onChange={(e)=>setQty(Number(e.target.value))}>
                            {[...Array(product.countInStock).keys()].map(x=><option key={x+1} value={x+1}>{x+1}</option>)}
                        </Form.Control>
                    </Col>
            </Row>
    </ListGroup.Item>
    )


    const submitHandler = async (e)=>
    {
        e.preventDefault()
        try 
        {
               const response = await review({productId,rating,comment}).unwrap()
               refetch()
               toast.success(response.message)
               setRating(0)
               setComment('')
        } 
        catch (error) 
        {
            toast.error(error?.data?.message || error.error)
        }
    }

    const renderReviewForm = ()=>
    (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='rating' className='my-2'>
                <Form.Label>Rating</Form.Label>
                    <Form.Control as='select' value={rating} onChange={e=>setRating(Number(e.target.value))}>
                        <option value=''>Select</option>
                        <option value='1'>1- Poor</option>
                        <option value='2'>2- Fair</option>
                        <option value='3'>3- Good</option>
                        <option value='4'>4- Very Good</option>
                        <option value='5'>5- Excellent</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='comment' className='my-2'>
                <Form.Label>Comment</Form.Label>
                <Form.Control as='textarea' row='3' value={comment} onChange={e=>setComment(e.target.value)}>

                </Form.Control>
            </Form.Group>
                <Button disabled={loadingProductReview} type='submit' variant='primary'>
                    Make Review
                </Button>
        </Form>
    )







    const renderSuccessView = ()=>
    (
        <>
            <Meta title={product.name} />
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={4}>
                    <ListGroup variant='flush'>
                        
                        {/* name of the product */}
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        {/* rating of the product */}
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>


                        {/* price of the product */}
                        <ListGroup.Item>
                            Price:RS{product.price}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        
                        <ListGroup variant='flush'>
                            
                            {/* price */}
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            
                            </ListGroup.Item>
                            
                            {/* product description */}
                            <ListGroup.Item>
                                
                                        {product.description}
                                    
                            
                            </ListGroup.Item>

                            {/* status */}
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong>{product.countInStock>0?'In Stock':'Out Of Stock'}</strong>
                                    </Col>
                                </Row>
                            
                            </ListGroup.Item>

                            { product.countInStock > 0 && (renderQtySelection())}

                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={product.countInStock===0} onClick={addToCartHandler}>Add To Cart</Button>
                            </ListGroup.Item>


                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            <Row className='review'>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>There are no Reviews for this Product</Message>}
                    <ListGroup variant='flush'>
                            {
                                product.reviews.map
                                (
                                    (reviewObject)=>
                                    (
                                            <ListGroup.Item key={reviewObject._id}>
                                                <strong>{reviewObject.name}</strong>
                                                <Rating value={reviewObject.rating} />
                                                <p>{reviewObject.createdAt.substring(0,10)}</p>
                                                <p>{reviewObject.comment}</p>
                                            </ListGroup.Item>
                                    )
                                )
                            }
                            <ListGroup.Item>
                                <h2>Fancy wanting to give a review? Go ahead.</h2>
                                {loadingProductReview && <Loader />}
                                {userInfo ?renderReviewForm() :<Message>Please <Link to='/login'>Login</Link> to review</Message> }
                            </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )







    const ProductScreenElement=
    <>
        <Link to='/' className='btn btn-dark my-3'>
            Go back
        </Link>

        {isLoading?<Loader />:error?(<Message variant='danger'>{error?.data?.message || error.error}</Message>):renderSuccessView()}
        
    </>



    return ProductScreenElement
}

export default ProductScreen