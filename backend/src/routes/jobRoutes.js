const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

// Define job routes
router.get("/in-progress", protect, jobController.listInProgressJobsForFreelancer);
router.get("/active", jobController.listActiveJobs);
router.get("/:jobId", jobController.getJobById); // Keep this after specific routes
router.get("/", jobController.listJobs);
router.post("/", jobController.addJob);
router.post("/:jobId/proposals", jobController.submitProposal);
router.put("/:jobId", jobController.updateJobProgress);
router.put("/:jobId/update", jobController.updateJob); // Update job details
router.delete("/:jobId", jobController.deleteJob); // Delete a job

module.exports = router;
