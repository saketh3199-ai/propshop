import { request } from "express"
import asyncHandler from "../middleware/asyncHandler.js"
import Product from '../models/productModel.js'

const GetProducts = asyncHandler
(
    async (request,response)=>
    {   

        const pageSize =2// This number specifies the total number of products to be shown on the screen 

        const page = Number(request.query.pageNumber) || 1 //If user clicks on page number 3, this will be 3
        const keyword = request.query.keyword ? {name:{$regex:request.query.keyword,$options: 'i'}} : {}
        //The keyword above will be {name:{$regex:iphone}}

        const count = await Product.countDocuments({...keyword}) // This gives the total number of product documents in the product collection
        //In the above Product.countDocuments({...keyword}), the {...keyword} will be {name:{$regex:request.query.keyword}}. So, in a way,
        //we can not use keyword variable and it will be fine



        const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
        //await Product.find({}) returns ALL PRODUCT DOCUMENTS in PRODUCTS COLLECTION
        //await Product.find({}).limit(pageSize) tells to include pageSize number of documents in PRODUCTS COLLECTION
        //await Product.find({}).limit(pageSize).skip(pageSize*(page-1)) tells to skip first pagesize*(page-1) number of documents
        // in product collection from beginning, and then from skip point, include pageSize number of documents
        
        response.json({products,page,pages:Math.ceil(count/pageSize)})
       
        
    }
)



const GetProductById = asyncHandler
(
    async(request,response)=>
    {
        const {id} = request.params

        const RelatedObject = await Product.findById(id)

        if (RelatedObject)
        {
            return response.json(RelatedObject)
        }
        else
        {
            response.status(400)
            throw new Error('Resource not found')
        }
        
    }
)

const createProduct = asyncHandler
(
    async (request,response)=>
    {
        const product = new Product
        (
            {
                name:'Sample name',
                price:0,
                user:request.user._id,
                image:'/images/sample.jpg',
                brand:'Sample brand',
                category:'Sample Category',
                countInStock:0,numReviews:0,
                description:'Sample Description'
            }
        )

        const createdProduct = await product.save()
        response.status(201)
        response.json(createdProduct)
    }
)


const updateProduct = asyncHandler
(
    async (request,response)=>
    {
        const {name,price,description,image,brand,category,countInStock} = request.body

        const product = await Product.findById(request.params.id)


        if (product)
        {
            product.name = name
            product.price = price
            product.description = description
            product.image = image
            product.brand = brand
            product.category = category
            product.countInStock = countInStock

            const updatedProduct = await product.save()
            response.json(updatedProduct)
        }
        else
        {
            response.status(404)
            throw new Error('Resource not found')
        }
    }
)


const deleteProduct = asyncHandler
(
    async (request,response)=>
    {
        const product = await Product.findById(request.params.id)

        if (product)
        {
            await Product.deleteOne({_id:product._id})
            response.status(200)
            response.json({message:'Product deleted'})
        }
        else
        {
            response.status(404)
            throw new Error('Resource not found')
        }
    }
)

const createProductReview = asyncHandler
(
    async (request,response)=>
    {
        //The request body would contain rating which a number like 4,5 and comment which is a string like 'good product nice one' etc
        const {rating,comment} = request.body

        //The below code snippet finds the Product document in the product collection concerned with the id received by the API
        const product = await Product.findById(request.params.id)

        if (product)
        {
            const alreadyReviewed = product.reviews.find
            (
                (reviewDocument)=>
                {
                    return reviewDocument.user.toString() === request.user._id.toString()
                }
            )

            if (alreadyReviewed)
            {
                response.status(400)
                throw new Error('Product has been already reviewed by you')
            }
            
            const review = {name:request.user.name,rating:Number(rating),comment,user:request.user._id}
            
            //The below code line says to push the review document into reviews array which is sub-collection in product-collection
            product.reviews.push(review)

            //The numReviews is basically number of reviews, and it's the length of reviews collection i.e number of documents present in 
            //reviews array/list/collection. Very simple no need to worry
            product.numReviews = product.reviews.length


            //Rating is obviously the sum of all individual ratings from each review document divided by number of review documents
            //The below line says the say
            product.rating = product.reviews.reduce((accumulator,review)=>accumulator+review.rating,0)/product.reviews.length

            await product.save()

            response.status(201)
            response.json({message:'Successfully added your review'})
            

        }

        else
        {
            response.status(404)
            throw new Error('The Resource is not found')
        }
    }
    
)

const GetTopThreeProducts = asyncHandler
(
    async (request,response)=>
    {
        //Get all Product in the documents sortd in descending order with respect to rating field and get only 3 products
        const products = await Product.find({}).sort({rating:-1}).limit(3)

        response.status(200)
        response.json(products)
    }
)

export {GetProducts,GetProductById,createProduct,updateProduct,deleteProduct,createProductReview,GetTopThreeProducts}