const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async(req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        // console.log(password)
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
        // console.log(hashedPassword)

        // Create and save the new user
        const user = await User.create({
            username,
            email,
            password: password,
            role: role || 'user'
        });
        // console.log(hashedPassword)


        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

// Login a user
exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare passwords
        console.log(user.password)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, message: 'Logged in successfully' });
    } catch (error) {
        next(error);
    }
};

// Get user profile
exports.getProfile = async(req, res, next) => {
    try {
        console.log(req.query)
        const user = await User.find({ email: req.query.email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.getProfileAndRecipe = async (req, res, next) => {
    try {
        console.log(req.query);
        const user = await User.findOne({ email: req.query.email })
            .select('-password')
            .populate('recipes'); // Populates the recipes field with Recipe documents

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

// Update user profile
exports.updateProfile = async(req, res, next) => {
    try {
        const updates = {...req.body };
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated', user });
    } catch (error) {
        next(error);
    }
};

// Delete a user (Admin only)
exports.deleteUser = async(req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// List all users (Admin only)
exports.getAllUsers = async(req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        next(error);
    }
};