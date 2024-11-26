const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// Define job routes
router.get("/", jobController.listJobs);
router.post("/", jobController.addJob);
router.get("/:jobId", jobController.getJobById);
router.post("/:jobId/proposals", jobController.submitProposal);
router.get("/active", jobController.listActiveJobs);
router.put("/:jobId", jobController.updateJobProgress);
router.put("/:jobId/update", jobController.updateJob); // Update job details
router.delete("/:jobId", jobController.deleteJob); // Delete a job

module.exports = router;
