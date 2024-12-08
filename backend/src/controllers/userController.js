const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const Skill = require("../models/Skill");
const Review = require("../models/Review");


// @desc    Delete a User by ID
// @route   DELETE /api/users/:id
// @access  Private (Admin-only route, optional)
const deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      
      // Check if the user exists
      const userToDelete = await User.findById(userId);
      
      if (!userToDelete) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Delete the user
      await User.findByIdAndDelete(userId);
  
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      next(error);
    }
  };


// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin-only route, optional)
// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin-only route, optional)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
      .select("-password") // Exclude passwords for security
      .populate("skills", "name") // Populate skill names only
      .populate("reviews", "rating title reviewText"); // Updated fields to match Review schema

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password, role, bio, location } = req.body;

  // Validate inputs
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }
  if (!["freelancer", "client", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified." });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      bio,
      location,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      throw new Error("Invalid user data.");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password." });
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
      .select("-password")
      .populate("skills", "name") // Populate skill names only
      .populate("reviews", "rating title reviewText"); // Updated fields to match Review schema

    if (!user) {
      return res.status(404).json({ message: "User not found." });
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
  const { bio, skills, profilePicture, location } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Validate skills if provided
    if (skills && !Array.isArray(skills)) {
      return res.status(400).json({ message: "Skills must be an array of valid skill IDs." });
    }

    if (skills) {
      const validSkills = await Skill.find({ _id: { $in: skills } });
      if (validSkills.length !== skills.length) {
        return res.status(400).json({ message: "Some skill IDs are invalid." });
      }
      user.skills = skills;
    }

    // Update fields
    user.bio = bio || user.bio;
    user.profilePicture = profilePicture || user.profilePicture;
    user.location = location || user.location;
    user.updatedAt = Date.now();

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// @desc    Get skills for a specific user by ID
// @route   GET /api/users/skills/:userId
// @access  Private
const getUserSkills = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("skills", "name");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const skills = user.skills.map((skill) => ({
      _id: skill._id,
      name: skill.name,
    }));

    res.status(200).json({
      success: true,
      skills,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {getUserSkills, deleteUser, registerUser, authUser, getUserProfile, updateUserProfile, getAllUsers };
