import {  PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints
(
    {
        endpoints:(builder)=>
        {
            return(
                {
                    getProducts:builder.query
                    (
                        {
                            query:({keyword,pageNumber})=>
                            {
                                return {url:PRODUCTS_URL,params:{pageNumber,keyword}}
                                //the api url changes to PRODUCTS_URL?pageNumber=3
                            },
                            providesTags:['Products'],
                             keepUnusedDataFor:5
                        }
                    ),
                    
                    getProductDetails:builder.query
                    (
                        {
                            query:(productId)=>
                            {
                                return {url:PRODUCTS_URL+productId}
                            },
                            keepUnusedDataFor:5
                        }
                    ),

                    createProduct:builder.mutation
                    (
                        {
                            query:()=>
                            {
                                return {url:PRODUCTS_URL,method:'POST'}
                            },
                            invalidatesTags:['Products']
                        }
                    ),
                    updateProduct:builder.mutation
                    (
                        {
                            query:(data)=>
                            {
                                return {url:`${PRODUCTS_URL}/${data._id}`,method:'PUT',body:data}
                            },
                            invalidatesTags:['Product']
                        }
                    ),
                    uploadProductImage:builder.mutation
                    (
                        {
                            query:(data)=>
                            {
                                return {url:`${UPLOAD_URL}`,method:'POST',body:data}
                            }
                        }
                    ),
                    deleteSpecificProduct:builder.mutation
                    (
                        {
                            query:(productId)=>
                            {
                                return {url:`${PRODUCTS_URL}/${productId}`,method:'DELETE'}
                            }
                        }
                    ),
                    makeReview:builder.mutation
                    (
                        {
                            query:(data)=>
                            {
                                return {url:`${PRODUCTS_URL}/${data.productId}/reviews`,method:'POST',body:data}
                            },
                            invalidatesTags:['Product']
                        }
                    ),
                    getTopThreeProducts:builder.query
                    (
                        {
                            query:()=>
                            {
                                return {url:`${PRODUCTS_URL}/top`,method:'GET'}
                            },
                            keepUnusedDataFor:5
                        }
                    )
                }
            )
        }
    }
)


export const {useGetProductsQuery,useGetProductDetailsQuery,useCreateProductMutation,useUpdateProductMutation,useUploadProductImageMutation,useDeleteSpecificProductMutation,useMakeReviewMutation,useGetTopThreeProductsQuery} = productsApiSlice


//keepUnusedDataFor:5 is another key in object of builder.query({query,keepUnusedDataFor}) just like query