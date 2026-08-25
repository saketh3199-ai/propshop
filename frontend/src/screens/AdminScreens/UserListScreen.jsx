import React from 'react'
import { useGetUsersQuery,useDeleteUserMutation } from '../../slices/usersApiSlice'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import {FaTimes,FaTrash,FaEdit,FaCheck} from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {toast} from 'react-toastify'



const UserListScreen = () => 
{
  const {data:users,refetch,isLoading,error} = useGetUsersQuery()
  // console.log(orders)
  
  const [deleteUser,{isLoading:deleteLoading}] = useDeleteUserMutation()

  const deleteHandler = async (userId)=>
  {
    // console.log('This is Delete Handler')
    if (window.confirm('Are you sure you want to delete this user?'))
    {
        try 
        {
            const response = await deleteUser(userId).unwrap()
            refetch()
            toast.success(response.message)
        } 
        catch (error) 
        {
            toast.error(error?.data?.message || error.message)
        }
    }
    
  }



  const renderTHead = ()=>
  (
    <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
    </thead>
  )

  const renderAllUsers = ()=>
  (
    <Table striped  hover responsive className='table-sm'>
        {renderTHead()}
        <tbody>
          {
            users.map
            (
              (user)=>
              (
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{<a href={`mailto:${user.email}`}>{user.email}</a>}</td>
                    
                    <td>{user.isAdmin?<FaCheck style={{color:'green'}} />:<FaTimes style={{color:'red'}}/>}</td>
                    
                    <td>
                        <LinkContainer to={`/admin/user/${user._id}`}>
                          <Button variant='light' className='btn-sm'>
                              <FaEdit />
                          </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}><FaTrash style={{color:'white'}}/></Button>
                    </td>
                </tr>
              )
            )
          }
        </tbody>
    </Table>
  )

  const OrderListScreenJsx = 
  <>
    <h1>Users</h1>
    {deleteLoading && <Loader />}
    {isLoading?<Loader />:error?<Message variant='danger'>{error}</Message>:renderAllUsers()}
  </>



  return  OrderListScreenJsx
}

export default UserListScreen







