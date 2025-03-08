const express = require('express')
const userRoutes = express.Router();
const AsyncHandler = require('express-async-handler');
const Order = require("../models/Order");
const User = require("../models/User");
const generateToken = require('../tokenGenerate');
const protect = require('../middleware/Auth');
userRoutes.post(
    "/login",
    AsyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    })
)

// Register route
userRoutes.post('/', AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    } else {
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt
            });
        }
        else{
                    res.status(400);
                    throw new Error('Invalid User Data')
                }
            }
            })
    );


// Get user profile
userRoutes.get(
    '/profile',
    protect,
    AsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    })
);
module.exports = userRoutes;