const Job = require("../models/Job");

// @desc    List all jobs with advanced filters
// @route   GET /api/jobs
// @access  Public
const listJobs = async (req, res, next) => {
    try {
        const filters = {};
        const { status, budgetType, experienceLevel, category } = req.query;

        if (status) filters.status = status;
        if (budgetType) filters.budgetType = budgetType;
        if (experienceLevel) filters.experienceLevel = experienceLevel;
        if (category) filters.category = category;

        const jobs = await Job.find(filters).populate("category", "name");
        res.status(200).json(jobs);
    } catch (error) {
        next(error);
    }
};

const addJob = async (req, res, next) => {
    const {
        title,
        description,
        category,
        budgetType,
        budgetAmount,
        hourlyRate,
        estimatedHours,
        deadline,
        attachments,
        requiredSkills,
        experienceLevel,
        preferredLocation,
        jobProviderId, // Adding jobProviderId from request body for demo data
    } = req.body;

    // Validate required fields
    if (
        !title ||
        !description ||
        !budgetType ||
        !budgetAmount ||
        !deadline ||
        !experienceLevel ||
        !jobProviderId // Ensure jobProviderId is provided
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
            estimatedHours,
            deadline: parsedDeadline,
            attachments,
            requiredSkills,
            experienceLevel,
            preferredLocation,
            jobProviderId, // Add jobProviderId directly from the request body
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
        return res.status(400).json({ message: "Proposal details are required" });
    }

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
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
            "name email"
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
            .json({ message: "Status is required to update job progress" });
    }

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
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

module.exports = {
    listJobs,
    submitProposal,
    listActiveJobs,
    updateJobProgress,
    addJob,
};
