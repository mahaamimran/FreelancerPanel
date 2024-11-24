const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const Skill = require('../models/Skill'); // Import the Skill model

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Validate inputs
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (!['freelancer', 'client', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role specified' });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error); // Pass to error handler middleware
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('skills', 'name'); // Populate skill names only

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
    const { bio, skills, profilePicture } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate skills if provided
        if (skills && !Array.isArray(skills)) {
            return res.status(400).json({ message: 'Skills must be an array of valid skill IDs' });
        }

        if (skills) {
            const validSkills = await Skill.find({ _id: { $in: skills } });
            if (validSkills.length !== skills.length) {
                return res.status(400).json({ message: 'Some skill IDs are invalid' });
            }
            user.skills = skills;
        }

        // Update fields
        user.bio = bio || user.bio;
        user.profilePicture = profilePicture || user.profilePicture;
        user.updatedAt = Date.now();

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, authUser, getUserProfile, updateUserProfile };
