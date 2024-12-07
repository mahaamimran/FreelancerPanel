const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const { protect } = require("../middleware/authMiddleware");

// POST: Create a new submission
router.post("/", protect, submissionController.createSubmission);

// GET: Get all submissions for a specific job
router.get("/:jobId", protect, submissionController.getSubmissionsByJob);

// PUT: Update a specific submission
router.put("/:id", protect, submissionController.updateSubmission);

// DELETE: Delete a specific submission
router.delete("/:id", protect, submissionController.deleteSubmission);

module.exports = router;
