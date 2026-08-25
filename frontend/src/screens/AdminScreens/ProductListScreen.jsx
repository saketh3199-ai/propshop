import React from 'react'
import { useGetProductsQuery,useCreateProductMutation,useDeleteSpecificProductMutation } from '../../slices/productsApiSlice'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button,Row,Col} from 'react-bootstrap'
import {FaEdit,FaTrash} from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom'
import Paginate from '../../components/Paginate'


const ProductListScreen = () => 
{
    const {pageNumber} = useParams()

    const {data, isLoading, error, refetch} = useGetProductsQuery({pageNumber})

    const [createProduct,{isLoading:loadingCreate}] = useCreateProductMutation()


    const [deleteTheProduct,{isLoading:loadingDelete}] = useDeleteSpecificProductMutation()

    const deleteHandler = async (productId)=>
    {
        if (window.confirm('are you sure you want to delete this product?'))
        {
            try 
            {
                const Response = await deleteTheProduct(productId).unwrap()
                refetch()
                toast.success(Response.message)
            } 
            catch (error) 
            {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    const renderProductsTable = ()=>
    (
        <>
            <Table striped hover responsive className='table-sm'>

                <thead>

                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                        </tr>

                </thead>


                <tbody>
                        {
                            data.products.map
                            (
                                (product)=>
                                (
                                    <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <th>{product.category}</th>
                                            <th>{product.brand}</th>
                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm mx-2' >
                                                        <FaEdit /> 
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant="danger" className='btn-sm' onClick={()=>deleteHandler(product._id)}><FaTrash style={{color:"white"}} /></Button>
                                            </td>

                                    </tr>
                                )
                            )
                        }
                </tbody>




            </Table>
            <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </>
    )

    const createProductHandler = async ()=>
    {
        if (window.confirm('Do you really want to create a new Product?'))
        {
            try 
            {
                await createProduct()
                refetch()    
            } 
            catch (error) 
            {
                toast.error(error?.data?.messge || error.error) 
            }
        }
       
    }

    const ProductListScreenJsx=
    <>
        <Row className='align-items-center'>

            <Col>
                <h1>Products</h1>
            </Col>

            <Col className="text-end">
                <Button className="m-3 btn-sm" onClick = {createProductHandler}>
                    <FaEdit />Create Product
                </Button>
            </Col>

        </Row>

        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
        {isLoading?(<Loader />):error?<Message variant='danger'>{error}</Message>:renderProductsTable()}
    </>

    return ProductListScreenJsx
  
}

export default ProductListScreen