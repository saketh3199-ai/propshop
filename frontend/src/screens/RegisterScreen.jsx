import { useState,useEffect } from "react";
import {Link,useLocation,useNavigate} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'

const RegisterScreen = ()=>
{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setconfirmPassword] = useState('')


    const dispatch = useDispatch()
    const navigate = useNavigate()

    //1. Array Destructuring
    const [register,{isLoading}] = useRegisterMutation()


    //2
    const {search} = useLocation()                      // {search:'?redirect='/shipping'}
    const sp = new URLSearchParams(search)              // {redirect:'/shipping'}
    const redirect = sp.get('redirect') || '/'          //fetches the '/shipping'

    //3
    const {userInfo} = useSelector((state)=>state.auth)


    //4
    useEffect
    (
        ()=>
        {
             if (userInfo)
             {
                navigate(redirect)
             }
        },[userInfo,redirect,navigate]

    )


    //This event handler triggers when the user clicks the button to sign-in/login
    const submitHandler = async (e)=>
    {
        e.preventDefault()

        //checking if passwords match

        if (password !== confirmPassword)
        {
            toast.error('Passwords are not matching')
            return
        }
        else
        {
            try
            {
                const res = await register({name,email,password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate(redirect)
            }
            catch(error)
            {
                toast.error(error?.data?.message || error.error)
            }
        }
        
    }


    const RegisterScreenJsx=
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
            
            {/* NAME  */}
            <Form.Group className='my-3' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                     type='text'
                     placeholder="Enter name"
                     value={name}
                     onChange={(e)=>setName(e.target.value)}
                     ></Form.Control>
            </Form.Group>


            
            
            {/* EMAIL FORM GROUP */}
            <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                     type='email'
                     placeholder="Enter Email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     ></Form.Control>
            </Form.Group>

            {/* PASSWORD FORM GROUP */}
            <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                     type='password'
                     placeholder="Enter password"
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                     ></Form.Control>
            </Form.Group>
            
            {/* CONFIRMED PASSWORD */}
            <Form.Group className='my-3' controlId='confirm password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                     type='password'
                     placeholder="Enter password"
                     value={confirmPassword}
                     onChange={(e)=>setconfirmPassword(e.target.value)}
                     ></Form.Control>
            </Form.Group>


            <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
                    Register
            </Button>

            {isLoading && <Loader />}
            <Row className='py-3'>
                <Col>
                    Already have an account?{' '}
                        <Link to={redirect?`/login/?redirect=${redirect}`:'/login'}>
                            Login
                        </Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>

    return RegisterScreenJsx
}

export default RegisterScreen