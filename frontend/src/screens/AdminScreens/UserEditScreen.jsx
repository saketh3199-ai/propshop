import React from 'react'
import { useState,useEffect } from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import { useGetUserDetailsQuery,useUpdateUserMutation } from '../../slices/usersApiSlice'


const UserEditScreen = () => 
{

    const {id:userId} = useParams()

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setIsAdmin] = useState(false)
    
    const {data:user,isLoading:loadingUser,error,refetch} = useGetUserDetailsQuery(userId)
    const [updateUser,{isLoading:loadingUpdate}] = useUpdateUserMutation()

    

     
    

  

    const navigate = useNavigate()

    useEffect
    (
      ()=>
      {
        if (user)
        {
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
          
        }

      },[user]
    )

    const submitHandler = async (e) => 
    {
      e.preventDefault()
      try
       {
          await updateUser({updatedUserInfo:{userId,name,email,isAdmin}}).unwrap()
          toast.success('User Details has been updated!!')
          refetch()
          navigate('/admin/userlist')
        } 
        catch (error) 
        {
          toast.error(error?.data?.message || error?.error || 'User Details Update failed')
        }
   }

   


    const renderForm = ()=>
    (
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
         </Form.Group>

          <Form.Group controlId='email' className='my-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
         </Form.Group>

       

        <Form.Group controlId='isAdmin' className='my-2'>
            <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}>
                
            </Form.Check>

        </Form.Group>

         

         <Button type='submit' variant='primary' className='my-2'>Update User</Button>

      </Form>
    )

    const UserEditScreenJsx = 
    <>
       <Link to='/admin/userlist' className='btn btn-light my-3'>
          Go Back
       </Link>

       <FormContainer>
          <h1>Edit User</h1>
          
          {loadingUpdate&&<Loader />}
          {loadingUser?<Loader />:error?<Message variant='danger'>{error}</Message>:renderForm()}
       </FormContainer>
    </>

    return UserEditScreenJsx

}

export default UserEditScreen