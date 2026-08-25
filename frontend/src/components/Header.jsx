import {Navbar,Nav,Container,Badge, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart,FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/usersApiSlice'
import {  useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SearchBox from './SearchBox'
const Header = ()=>
{

    const {cartItems} = useSelector((state)=>state.cart)
    const {userInfo} = useSelector((state)=>state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const renderQty = ()=>
    (
        <Badge pill bg='success' style={{marginLeft:'5px'}}>
            {
                cartItems.reduce
                (
                    (accumulator,cartObject)=>
                    {
                        return accumulator+cartObject.qty
                     },0
                )
            }
        </Badge>
    )

    const logoutHandler = async ()=>
    {
        try
        {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const renderUserTab = ()=>
    (
        <NavDropdown title={userInfo.name}>
            <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>
                Logout
            </NavDropdown.Item>
        </NavDropdown>
    )

    const renderSigninTab = ()=>
    (
        <LinkContainer to="/login">
            <Nav.Link><FaUser />Sign In</Nav.Link>
        </LinkContainer>
    )

    const headerEl=
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                
                <LinkContainer to="/">
                    <Navbar.Brand>
                        ProShop
                    </Navbar.Brand>
                </LinkContainer>
                
                
                
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <SearchBox />
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                
                                <FaShoppingCart />
                                Cart
                                {cartItems.length>0?renderQty():''}
                            
                            
                            </Nav.Link>
                        
                        
                        </LinkContainer>
                        
                        
                        {userInfo? renderUserTab():renderSigninTab()}
                        {
                            (userInfo&&userInfo.isAdmin)&&
                            <NavDropdown title='Admin' id='adminmenu'>

                                <LinkContainer to='/admin/productlist'>

                                    <NavDropdown.Item>Products</NavDropdown.Item>

                                </LinkContainer>

                                <LinkContainer to='/admin/userlist'>

                                    <NavDropdown.Item>Users</NavDropdown.Item>

                                </LinkContainer>

                                <LinkContainer to='/admin/orderlist'>

                                    <NavDropdown.Item>Orders</NavDropdown.Item>

                                </LinkContainer>

                            </NavDropdown>
                        }
                    </Nav>
                    
                        
                    
                </Navbar.Collapse>
            </Container>


        </Navbar>

    </header>

    return headerEl
}

export default Header