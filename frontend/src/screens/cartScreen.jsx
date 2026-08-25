import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import {FaTrash} from 'react-icons/fa'
import Message from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart,removeFromCart } from '../slices/cartSlice'

const CartScreen = ()=>
{
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state=>state.cart)
    const {cartItems} = cart


    const renderCartEmpty =  ()=>
    (
        <Message>
            Your Cart is Empty <Link to='/'>Go Back</Link>
        </Message>
    )

    const addToCartHandler = async (cartObject,qty)=>
    {
        dispatch(addToCart({...cartObject,qty}))
    }

    const checkoutHandler = ()=>
    {
        navigate('/login?redirect=/shipping')
    }

    const renderCartItems = ()=>
    (
        <ListGroup variant='flush'>

            {
                cartItems.map
                (
                    (cartObject)=>
                    (
                        <ListGroup.Item key={cartObject._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={cartObject.image} alt={cartObject.name} fluid rounded />
                                </Col>

                                <Col md={3}>
                                    <Link to={`/product/${cartObject._id}`}>
                                        {cartObject.name}
                                    </Link>
                                </Col>

                                <Col md={2}>
                                    ${cartObject.price}
                                </Col>

                                <Col md={2}>
                                    <Form.Control as='select' value={cartObject.qty} onChange={e=>addToCartHandler(cartObject,Number(e.target.value))}>
                                        {[...Array(cartObject.countInStock).keys()].map(x=><option key={x+1} value={x+1}>{x+1}</option>)}
                                    </Form.Control>
                                </Col>

                                <Col md={2}>
                                    <Button type='button' variant='light' onClick={e=>dispatch(removeFromCart(cartObject._id))}><FaTrash /></Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                        
                    
                )
            }
        </ListGroup>
    )

    const CartScreenJsx = 
    <Row>
        <Col md={8}>
            <h1 style={{marginBottom:'20px'}}>Shopping Cart</h1>
            {cartItems.length===0?renderCartEmpty():renderCartItems()}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>
                            Subtotal ({cartItems.reduce((accumulator,cartObject)=>{return accumulator+cartObject.qty},0)}) items
                        </h2>
                        ${cartItems.reduce((accumulator,cartObject)=>{return accumulator+cartObject.price*cartObject.qty},0).toFixed(2)}
                    </ListGroup.Item>

                    <ListGroup.Item>
                       <Button type='button' className='btn-block' disable={cartItems.length===0} onClick={checkoutHandler}>
                            Proceed to Checkout
                       </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>

    return CartScreenJsx
}

export default CartScreen