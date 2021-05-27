import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// #desc  Create new order
// #route POST '/api/orders'
// #access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length) {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    return res.status(201).json(createdOrder);
  }

  res.status(400);
  throw new Error('No order items');
});

// #desc  Get order by ID
// #route GET '/api/orders/:id'
// #access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    if (req.user.isAdmin) return res.json(order);
    if (req.user._id.toString() === order.user._id.toString()) {
      return res.json(order);
    }

    res.status(403);
    throw new Error('Insufficient Permissions');
  }
  res.status(404);
  throw new Error('Order Not Found');
});

// #desc  Update order to paid
// #route PUT '/api/orders/:id/pay'
// #access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  }

  res.status(404);
  throw new Error('Order Not Found');
});

// #desc  Update order to delivered
// #route PUT '/api/orders/:id/deliver'
// #access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  }

  res.status(404);
  throw new Error('Order Not Found');
});

// #desc  Get logged in user orders
// #route GET /api/orders/myorders
// #access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders) return res.json(orders);
  res.status(404);
  throw new Error('Order Not Found');
});

// #desc  Get All orders
// #route GET /api/orders
// #access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  if (orders) return res.json(orders);
  res.status(404);
  throw new Error('Order Not Found');
});

export {
  getOrders,
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
};
