const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.get("/", protect, userController.getAllUsers);
router.delete("/:id", protect, userController.deleteUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.authUser);
router.get('/profile', protect, userController.getUserProfile);
router.put('/profile', protect, userController.updateUserProfile);
router.get("/skills/:userId", protect, userController.getUserSkills);

module.exports = router;
