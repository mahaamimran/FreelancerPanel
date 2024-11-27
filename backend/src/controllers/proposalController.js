const Proposal = require("../models/Proposal");
const Job = require("../models/Job");

// @desc Submit a proposal
// @route POST /api/proposals
// @access Freelancer
const submitProposal = async (req, res, next) => {
  try {
    const { jobId, budgetType, budgetAmount, budgetHourlyRate, coverLetterText, attachments } = req.body;

    if (!jobId || !budgetType || !coverLetterText) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (budgetType === "Hourly" && (!budgetHourlyRate || budgetHourlyRate <= 0)) {
      return res.status(400).json({ message: "Invalid hourly rate." });
    }

    if (budgetType === "Fixed" && (!budgetAmount || budgetAmount <= 0)) {
      return res.status(400).json({ message: "Invalid budget amount." });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    const existingProposal = await Proposal.findOne({ freelancerId: req.user._id, jobId });
    if (existingProposal) {
      return res.status(400).json({ message: "Proposal already submitted for this job." });
    }

    const proposal = await Proposal.create({
      freelancerId: req.user._id,
      jobId,
      budgetType,
      budgetAmount: budgetType === "Fixed" ? budgetAmount : undefined,
      budgetHourlyRate: budgetType === "Hourly" ? budgetHourlyRate : undefined,
      coverLetterText,
      attachments,
    });

    job.proposalsCount += 1;
    job.receivedProposals.push(proposal._id);
    await job.save();

    return res.status(201).json({
      message: "Proposal submitted successfully.",
      proposal,
    });
  } catch (error) {
    console.error("Error in submitProposal:", error);
    next(error);
  }
};

module.exports = { submitProposal };


// @desc Get proposals by Job ID
// @route GET /api/proposals/:jobId
// @access Freelancer
const getProposalsByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Fetch proposals for the given Job ID
    const proposals = await Proposal.find({ jobId });
    res.status(200).json(proposals);
  } catch (error) {
    next(error);
  }
};

// @desc Update a proposal by Proposal ID
// @route PUT /api/proposals/:proposalId
// @access Freelancer
const updateProposal = async (req, res) => {
  try {
    const { proposalId } = req.params;
    const { budgetType, budgetAmount, budgetHourlyRate, coverLetterText, attachments } = req.body;

    // Find the proposal
    const proposal = await Proposal.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found." });
    }

    // Ensure only the owner can update the proposal
    if (proposal.freelancerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this proposal." });
    }

    // Update the proposal fields
    proposal.budgetType = budgetType || proposal.budgetType;
    proposal.budgetAmount = budgetType === "Fixed" ? budgetAmount : proposal.budgetAmount;
    proposal.budgetHourlyRate = budgetType === "Hourly" ? budgetHourlyRate : proposal.budgetHourlyRate;
    proposal.coverLetterText = coverLetterText || proposal.coverLetterText;
    proposal.attachments = attachments || proposal.attachments;
    proposal.updatedAt = Date.now();

    await proposal.save();
    res.status(200).json({ message: "Proposal updated successfully.", proposal });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a proposal by Proposal ID and Job ID
// @route DELETE /api/proposals/:jobId/:proposalId
// @access Freelancer
const deleteProposal = async (req, res) => {
  try {
    const { proposalId, jobId } = req.params;

    // Find the proposal
    const proposal = await Proposal.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found." });
    }

    // Ensure only the owner can delete the proposal
    if (proposal.freelancerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this proposal." });
    }

    // Remove the proposal
    await proposal.deleteOne();

    // Update the job to decrement the proposals count
    const job = await Job.findById(jobId);
    if (job) {
      job.proposalsCount = Math.max(0, job.proposalsCount - 1);
      job.receivedProposals = job.receivedProposals.filter(
        (proposalId) => proposalId.toString() !== proposal._id.toString()
      );
      await job.save();
    }

    res.status(200).json({ message: "Proposal deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// @desc Get the current user's proposal for a specific job
// @route GET /api/proposals/:jobId/me
// @access Freelancer
const getProposalForJobByUser = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const freelancerId = req.user._id; // Assume `req.user` contains the authenticated user

    const proposal = await Proposal.findOne({ jobId, freelancerId });
    if (!proposal) {
      return res.status(404).json({ message: "No proposal found for this job." });
    }

    res.status(200).json(proposal);
  } catch (error) {
    console.error("Error fetching user proposal:", error);
    next(error);
  }
};


module.exports = {
  submitProposal,
  getProposalsByJobId,
  updateProposal,
  deleteProposal,
  getProposalForJobByUser,
};
