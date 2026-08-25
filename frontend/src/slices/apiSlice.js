import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'


//fetchBaseQuery is a function that allows to make request to backend api

const baseQuery = fetchBaseQuery({baseUrl:BASE_URL})

export const apiSlice = createApi
(
    {
        baseQuery,
        tagTypes:['Product','Order','User'],
        endpoints:(builder)=>({})
    }
)


//tagTypes define type of data that we will fetch from api'
//endpoints lets you to call api without using effect hook and axios

//brad says that this slice acts as parent to other api slices.