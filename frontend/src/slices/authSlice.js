import {createSlice} from '@reduxjs/toolkit'


const initialState = 
{
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))  : null
}

const setCredentialsReducer = (state,action)=>
{
    state.userInfo = action.payload
    localStorage.setItem('userInfo',JSON.stringify(action.payload))
}

const logoutReducer = (state,action)=>
{
    state.userInfo = null
    localStorage.removeItem('userInfo')
}

const authSlice= createSlice
(
    {
        name:'auth',
        initialState,
        reducers:
        {
            setCredentials:setCredentialsReducer,
            logout:logoutReducer
        }
    }
)


export const {setCredentials,logout} = authSlice.actions

export default authSlice.reducer