import asyncHandler from "../middleware/asyncHandler.js"
import Order from '../models/orderModel.js'


//THE BELOW API TRIGGERED : USER ADDS ORDER
export const addOrderItems = asyncHandler
(
    async (request,response)=>
    {
        const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice} = request.body

        if (orderItems && orderItems.length===0)
        {
            response.status(400)
            throw new Error('There are no order Items')
        }
        else
        {
            const modifiedOrderItems =  orderItems.map
            (
                (x)=>
                {
                    return {...x,product:x._id,_id:undefined}
                }
            )
            //1.orderItem is an array of objects which are products. The product object will have _id
            //2.The new key product is made because please refer to Order model. This product key will have the _id of product object as value
            //3.The _id will be desperately set to undefined
            //4.Later, while mongoose puts the order in db, there will be _id assigned for each product

           const order = new Order
           (
            {
                orderItems:modifiedOrderItems,
                user:request.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            }
           )  

           const createdOrder = await order.save()

           response.status(200)
           response.json(createdOrder)

        }
    }
)

//THE BELOW API TRIGGERED : USER WANTS TO LOOK AT HIS ORDER
export const getMyOrders = asyncHandler
(
    async (request,response)=>
    {
        const orders = await Order.find({user:request.user._id})
        response.status(200)
        response.json(orders)
    }
)




//THE BELOW API TRIGGERED : GET ORDER BY ID
export const getOrderById = asyncHandler
(
    async (request,response)=>
    {
        const order = await Order.findById(request.params.id).populate('user','name email')

        if (order)
        {
            response.status(200)
            response.send(order)
        }
        else
        {
            response.status(404)
            throw new Error('Order Not Found')
        }
    }
)

//UPDATE ORDER TO PAID
export const updateOrderToPaid = asyncHandler
(
    async (request,response)=>
    {
        const orderId = request.params.id
        const order = await Order.findById(orderId)

        if (order)
        {
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {id:request.body.id,status:request.body.status,update_time:request.body.update_time,email_address:request.body.payer.email_address}

            const updatedOrder = await order.save()

            response.status(200)
            response.json(updatedOrder)
        }
        else
        {
            response.status(404)
            throw new Error('Order not Found')
        }
    }
)


//BELOW IS ADMIN API TRYING TO SET ORDER AS 'DELIVERED'


export const updateOrderToDelivered = asyncHandler
(
    async (request,response)=>
    {
        const order = await Order.findById(request.params.id)

        if (order)
        {
            order.isDelivered = true
            order.deliveredAt = Date.now()

            const updatedOrder = await order.save()

            response.status(200)
            response.json(updatedOrder)
        }
        else
        {
            response.status(404)
            throw new Error('Order not found')
        }
    }
)


//GET ALL ORDERS
export const getOrders = asyncHandler
(
    async (request,response)=>
    {
        const orders = await Order.find({}).populate('user','id name')
        response.status(200)
        response.json(orders)
    }
)