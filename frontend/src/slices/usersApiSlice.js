import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints
(
    {
        endpoints:(builder)=>
        {
            return (
                {
                    login:builder.mutation
                    (
                        {
                            query:(data)=>
                            {
                                return {url:`${USERS_URL}/login`,method:'POST',body:data}
                            }
                        }
                    ),
                    
                    logout:builder.mutation
                    (
                        {
                            query:()=>
                            {
                                return {url:`${USERS_URL}/logout`,method:'POST'}
                            }
                        }
                    ),
                    
                    register:builder.mutation
                    (
                        {
                            query:(data)=>
                            {
                                 return {url:`${USERS_URL}/`,method:'POST',body:data}
                            }
                        }
                    ),
                    profile:builder.mutation
                    (
                        {
                            query:(data)=>
                            {
                                return {url:`${USERS_URL}/profile`,method:'PUT',body:data}
                            }
                        }
                    ),
                    getUsers:builder.query
                    (
                        {
                            query:()=>
                            {
                                return {url:USERS_URL,method:'GET'}
                            },
                            providesTags:['Users'],
                            keepUnusedDataFor:5
                        }
                    ),
                    deleteUser:builder.mutation
                    (
                        {
                            query:(userId)=>
                            {
                                return {url:`${USERS_URL}/${userId}`,method:'DELETE'}
                            }
                        }
                    ),
                    getUserDetails:builder.query
                    (
                        {
                            query:(userId)=>
                            {
                                return {url:`${USERS_URL}/${userId}`,method:'GET'}
                            },
                            keepUnusedDataFor:5
                        }
                    ),
                    updateUser:builder.mutation
                    (
                        {
                            query:({updatedUserInfo})=>
                            {
                                return {url:`${USERS_URL}/${updatedUserInfo.userId}`,method:'PUT',body:updatedUserInfo}
                            }
                        }
                    ),
                    invalidateTags:['User']
                }
            )
        }
    }
)



export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation,useGetUsersQuery,useDeleteUserMutation,useGetUserDetailsQuery,useUpdateUserMutation} = usersApiSlice