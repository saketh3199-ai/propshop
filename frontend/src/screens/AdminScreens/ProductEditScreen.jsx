import React from 'react'
import { useState,useEffect } from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import { useUpdateProductMutation,useGetProductDetailsQuery,useUploadProductImageMutation } from '../../slices/productsApiSlice'


const ProductEditScreen = () => 
{

    const {id:productId} = useParams()

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState('')
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState('')


    //RTK QUERY TO FETCH SPECIFIC PRODUCT
    const {data:product,isLoading,error} = useGetProductDetailsQuery(`/${productId}`)

     console.log(product)

    //RTK MUTATION TO UPDATE PRODUCT
    const [updateProduct,{isLoading:loadingUpdating}] = useUpdateProductMutation()

   //RTK MUTATION TO UPLOAD IMAGE
   const [uploadProductImage] = useUploadProductImageMutation()

    const navigate = useNavigate()

    useEffect
    (
      ()=>
      {
        if (product)
        {
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setBrand(product.brand)
          setCategory(product.category)
          setCountInStock(product.countInStock)
          setDescription(product.description)
        }

      },[product]
    )

    const submitHandler = async (e) => 
    {
      e.preventDefault()
      try
       {
          await updateProduct({_id: productId,name,price,image,brand,countInStock,category,description}).unwrap()
          toast.success('Product has been updated!!')
          navigate('/admin/productlist')
        } 
        catch (error) 
        {
          toast.error(error?.data?.message || error?.error || 'Update failed')
        }
   }

   const uploadFileHandler = async (e)=>
   {
      const formData = new FormData()
      formData.append('image',e.target.files[0])

      try
      {
         const response = await uploadProductImage(formData).unwrap()
         toast.success(response.message)
         setImage(response.image)
      }
      catch(error)
      {
         toast.error(error?.data?.message || error.message)
      }
   }


    const renderForm = ()=>
    (
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
         </Form.Group>

          <Form.Group controlId='price' className='my-2'>
            <Form.Label>Price</Form.Label>
            <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e)=>setPrice(e.target.value)}></Form.Control>
         </Form.Group>

        {/* IMAGE PLACEHOLDER */}
        <Form.Group controlId='image' className='my-2'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e)=>setImage}></Form.Control>
            <Form.Control type='file' label='choose a file' onChange={uploadFileHandler}></Form.Control>
        </Form.Group>

        <Form.Group controlId='brand' className='my-2'>
            <Form.Label>Brand</Form.Label>
            <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e)=>setBrand(e.target.value)}></Form.Control>
         </Form.Group>

         <Form.Group controlId='countInStock' className='my-2'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control type='number' placeholder='Enter Brand' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}></Form.Control>
         </Form.Group>

         <Form.Group controlId='category' className='my-2'>
            <Form.Label>Category</Form.Label>
            <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
         </Form.Group>

         <Form.Group controlId='description' className='my-2'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
         </Form.Group>


         <Button type='submit' variant='primary' className='my-2'>Update Product</Button>

      </Form>
    )

    const ProductEditScreenJsx = 
    <>
       <Link to='/admin/productlist' className='btn btn-light my-3'>
          Go Back
       </Link>

       <FormContainer>
          <h1>Edit Product</h1>
          {loadingUpdating&&<Loader />}

          {isLoading?<Loader />:error?<Message variant='danger'>{error}</Message>:renderForm()}
       </FormContainer>
    </>

    return ProductEditScreenJsx

}

export default ProductEditScreen