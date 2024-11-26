const Job = require("../models/Job");

// @desc    List all jobs with advanced filters
// @route   GET /api/jobs
// @access  Public
const listJobs = async (req, res, next) => {
  try {
    const filters = {};
    const { status, budgetType, experienceLevel, category, search, estimatedTime } = req.query;

    // Apply filters based on query parameters
    if (status) filters.status = status;
    if (budgetType) filters.budgetType = budgetType;
    if (experienceLevel) filters.experienceLevel = experienceLevel;
    if (category) filters.category = category;
    if (estimatedTime) filters.estimatedTime = estimatedTime;
    if (search) {
      filters.title = { $regex: search, $options: "i" }; // Case-insensitive search by title
    }

    // Fetch jobs from the database
    const jobs = await Job.find(filters).populate("category", "name");
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new job
// @route   POST /api/jobs
// @access  Private
const addJob = async (req, res, next) => {
  const {
    title,
    description,
    category,
    budgetType,
    budgetAmount,
    hourlyRate,
    estimatedTime,
    deadline,
    attachments,
    requiredSkills,
    experienceLevel,
    preferredLocation,
    jobProviderId,
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !budgetType ||
    !budgetAmount ||
    !deadline ||
    !experienceLevel ||
    !jobProviderId
  ) {
    return res
      .status(400)
      .json({ message: "All required fields, including jobProviderId, must be provided." });
  }

  // Validate deadline
  const parsedDeadline = new Date(deadline);
  if (isNaN(parsedDeadline.getTime()) || parsedDeadline < new Date()) {
    return res.status(400).json({ message: "Invalid or past deadline." });
  }

  try {
    // Create a new job
    const job = new Job({
      title,
      description,
      category,
      budgetType,
      budgetAmount,
      hourlyRate,
      estimatedTime, // Add estimated time to the job
      deadline: parsedDeadline,
      attachments,
      requiredSkills,
      experienceLevel,
      preferredLocation,
      jobProviderId,
    });

    // Save to the database
    const savedJob = await job.save();

    // Respond with the created job
    res.status(201).json({
      success: true,
      message: "Job created successfully.",
      data: savedJob,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a job proposal
// @route   POST /api/jobs/:jobId/proposals
// @access  Public
const submitProposal = async (req, res, next) => {
  const { jobId } = req.params;
  const { proposalDetails } = req.body;

  if (!proposalDetails) {
    return res.status(400).json({ message: "Proposal details are required." });
  }

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    job.receivedProposals.push(proposalDetails);
    job.proposalsCount += 1;

    const updatedJob = await job.save();

    res.status(201).json(updatedJob);
  } catch (error) {
    next(error);
  }
};

// @desc    List all active projects
// @route   GET /api/jobs/active
// @access  Private
const listActiveJobs = async (req, res, next) => {
  try {
    const activeJobs = await Job.find({ status: "In Progress" }).populate(
      "jobProviderId",
      "firstName lastName email"
    );

    res.json(activeJobs);
  } catch (error) {
    next(error);
  }
};

// @desc    Update project progress
// @route   PUT /api/jobs/:jobId
// @access  Private
const updateJobProgress = async (req, res, next) => {
  const { jobId } = req.params;
  const { status, progressDetails } = req.body;

  if (!status) {
    return res
      .status(400)
      .json({ message: "Status is required to update job progress." });
  }

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    job.status = status;
    if (progressDetails) {
      job.progressDetails = progressDetails;
    }

    const updatedJob = await job.save();

    res.json(updatedJob);
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  const { jobId } = req.params;

  try {
    // Fetch the job and populate job provider details
    const job = await Job.findById(jobId).populate("jobProviderId", "firstName lastName email bio avgRating reviews");

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Update job details
// @route   PUT /api/jobs/:jobId/update
// @access  Private
const updateJob = async (req, res, next) => {
  const { jobId } = req.params;

  try {
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:jobId
// @access  Private
const deleteJob = async (req, res, next) => {
  const { jobId } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  listJobs,
  submitProposal,
  listActiveJobs,
  updateJobProgress,
  addJob,
  getJobById,
  updateJob,
  deleteJob
};
