import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :{cartItems:[],shippingAddress:{},paymentMethod:'PayPal'}



const addToCartReducer = (state,action)=>
{
    const item = action.payload

    const existItem = state.cartItems.find
    (
        (x)=>
        {
            if (x._id === item._id)
            {
                return true
            }
        }
    )

    //-----------------------------------------------
    //-----------------------------------------------
    //-----------------------------------------------
    //if item exists already, then update/replace it
    if (existItem)
    {
        state.cartItems = state.cartItems.map
        (
            (x)=>
            {
                if (x._id === existItem._id)
                {
                    return item
                }
                else
                {
                    return x
                }
            }
        )
    }
    //else simply insert the item 
    else
    {
        state.cartItems = [...state.cartItems,item]
    }
    //------------------------------------------------
    //------------------------------------------------
    //------------------------------------------------


    return updateCart(state)

    

}


const removeFromCartReducer = (state,action)=>
{
    const IdOfProductToBeDeleted = action.payload

    state.cartItems = state.cartItems.filter
    (
        (cartItem)=>
        {
            if (cartItem._id !== IdOfProductToBeDeleted)
            {
                return cartItem
            }
        }
    )

    return updateCart(state)
}


const saveShippingAddressReducer = (state,action)=>
{
    state.shippingAddress = action.payload
    return updateCart(state)
}

const savePaymentMethodReducer = (state,action)=>
{
    state.paymentMethod = action.payload
    return updateCart(state)
}

const clearCartItemsReducer = (state,action)=>
{
    state.cartItems = []
    return updateCart(state)
}

const cartSlice = createSlice
(
    {
        name:'cart',
        initialState,
        reducers:
        {
            addToCart:addToCartReducer,
            removeFromCart:removeFromCartReducer,
            saveShippingAddress:saveShippingAddressReducer,
            savePaymentMethod:savePaymentMethodReducer,
            clearCartItems:clearCartItemsReducer
        }
    }
)


export const {addToCart,removeFromCart,saveShippingAddress,savePaymentMethod,clearCartItems} = cartSlice.actions
export default cartSlice.reducer





//in add cart item function, if item already exists, then we will still insert the item but we actually replace the existing item