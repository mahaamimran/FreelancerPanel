const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const proposalController = require("../controllers/proposalController");

const router = express.Router();

// Route to submit a proposal
router.post("/", protect, proposalController.submitProposal);

// Route to get proposals by Job ID
router.get("/:jobId", protect, proposalController.getProposalsByJobId);

// Route to update a proposal by Proposal ID
router.put("/:proposalId", protect, proposalController.updateProposal);

// Route to delete a proposal by Proposal ID and Job ID
router.delete("/:jobId/:proposalId", protect, proposalController.deleteProposal);
router.get("/:jobId/me", protect, proposalController.getProposalForJobByUser);


module.exports = router;
