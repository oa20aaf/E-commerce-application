const express = require("express");
const orderRoute = express.Router();
const protect = require("../middleware/Auth");
const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// 🛒 Create an Order & Generate PaymentIntent
orderRoute.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items found!");
    }

    // Validate shipping address
    if (
      !shippingAddress ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.country
    ) {
      res.status(400);
      throw new Error("Shipping address is required.");
    }

    // Create a new order with user-provided shipping address
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: false,
    });

    const createdOrder = await order.save();

    // Generate Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency: "gbp",
      automatic_payment_methods: { enabled: true },
      metadata: { orderId: createdOrder._id.toString() },
    });

    // Store PaymentIntent ID in order
    createdOrder.paymentIntentId = paymentIntent.id;
    await createdOrder.save();

    res.status(201).json({
      orderId: createdOrder._id,
      clientSecret: paymentIntent.client_secret,
    });
  })
);

// ✅ Confirm Payment & Update Order
orderRoute.post(
  "/confirm-payment",
  protect,
  asyncHandler(async (req, res) => {
    const { paymentIntentId } = req.body;

    const order = await Order.findOne({ paymentIntentId });

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    // Retrieve payment status from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      order.isPaid = true;
      order.paidAt = new Date();
      await order.save();
      res.json({ message: "Payment successful", order });
    } else {
      res.status(400);
      throw new Error("Payment not completed");
    }
  })
);

// 📦 Get All Orders for a User
orderRoute.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.status(200).json(orders);
  })
);

// 📦 Get Order by ID (Includes Shipping Address)
orderRoute.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "email");
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

module.exports = orderRoute;
