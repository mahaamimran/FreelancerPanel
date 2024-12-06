const express = require("express");
const { sendEmailToJobProvider } = require("../controllers/emailController");
const router = express.Router();

router.post("/job-provider", sendEmailToJobProvider);

module.exports = router;
