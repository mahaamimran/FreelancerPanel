const Submission = require("../models/Submission");
const Job = require("../models/Job");

// @desc Create a new submission
// @route POST /api/submissions
// @access Freelancer
const createSubmission = async (req, res, next) => {
  const { jobId, title, text, attachments } = req.body;

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      const error = new Error("Job not found");
      res.status(404);
      return next(error);
    }

    // Ensure the logged-in user is the assigned freelancer
    if (job.freelancerId.toString() !== req.user._id.toString()) {
      const error = new Error("You are not assigned to this job");
      res.status(403);
      return next(error);
    }

    // Check if a submission already exists for this job and freelancer
    const existingSubmission = await Submission.findOne({
      jobId,
      freelancerId: req.user._id,
    });

    if (existingSubmission) {
      return res.status(400).json({ message: "You have already submitted work for this job." });
    }

    const submission = await Submission.create({
      jobId,
      freelancerId: req.user._id,
      jobProviderId: job.jobProviderId,
      title,
      text,
      attachments,
    });

    res.status(201).json(submission);
  } catch (error) {
    next(error);
  }
};


// @desc Get all submissions for a job
// @route GET /api/submissions/job/:jobId
// @access Job Provider / Admin
const getSubmissionsByJob = async (req, res, next) => {
  const { jobId } = req.params;

  try {
    const submissions = await Submission.find({ jobId })
      .populate("freelancerId", "firstName lastName email")
      .populate("jobProviderId", "firstName lastName email")
      .select("title text status attachments createdAt updatedAt"); 

    if (!submissions.length) {
      const error = new Error("No submissions found for this job");
      res.status(404);
      return next(error);
    }

    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    next(error);
  }
};


// @desc Update a submission
// @route PUT /api/submissions/:id
// @access Freelancer
const updateSubmission = async (req, res, next) => {
  const { id } = req.params;
  const { title, text, attachments, status } = req.body; // Include status

  try {
    const submission = await Submission.findById(id);

    if (!submission) {
      const error = new Error("Submission not found");
      res.status(404);
      return next(error);
    }

    const job = await Job.findById(submission.jobId);

    if (!job) {
      const error = new Error("Job associated with the submission not found");
      res.status(404);
      return next(error);
    }

    // Ensure the logged-in user is the assigned freelancer
    if (job.freelancerId.toString() !== req.user._id.toString()) {
      const error = new Error("You are not authorized to update this submission");
      res.status(403);
      return next(error);
    }

    // Update allowed fields
    submission.title = title || submission.title;
    submission.text = text || submission.text;
    submission.attachments = attachments || submission.attachments;

    // Allow admin or job provider to update the status
    if (status && ["Pending", "Complete"].includes(status)) {
      submission.status = status;
    }

    submission.updatedAt = Date.now();

    await submission.save();

    res.status(200).json(submission);
  } catch (error) {
    next(error);
  }
};


// @desc Delete a submission
// @route DELETE /api/submissions/:id
// @access Freelancer
const deleteSubmission = async (req, res, next) => {
  const { id } = req.params;

  try {
    const submission = await Submission.findById(id);

    if (!submission) {
      const error = new Error("Submission not found");
      res.status(404);
      return next(error);
    }

    const job = await Job.findById(submission.jobId);

    if (!job) {
      const error = new Error("Job associated with the submission not found");
      res.status(404);
      return next(error);
    }

    // Ensure the logged-in user is the assigned freelancer
    if (!job.freelancerId || job.freelancerId.toString() !== req.user._id.toString()) {
      const error = new Error("You are not authorized to delete this submission");
      res.status(403);
      return next(error);
    }

    await Submission.findByIdAndDelete(id);

    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get a specific submission by ID
const getSubmissionById = async (req, res, next) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate("freelancerId", "firstName lastName email")
      .populate("jobProviderId", "firstName lastName email");

    if (!submission) {
      return res.status(404).json({ success: false, message: "Submission not found" });
    }

    res.status(200).json({ success: true, data: submission });
  } catch (error) {
    console.error("Error fetching submission by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createSubmission,
  getSubmissionsByJob,
  updateSubmission,
  deleteSubmission,
  getSubmissionById,
};
