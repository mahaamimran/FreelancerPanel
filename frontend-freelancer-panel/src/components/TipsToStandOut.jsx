import { motion } from "framer-motion";
import React from "react";

const TipsToStandOut = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="bg-blue-50 p-6 rounded-lg shadow-lg"
  >
    <h3 className="text-lg font-semibold text-primary mb-4">💡 Tips to Stand Out</h3>
    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
      <li>Personalize your proposal to the job and provider.</li>
      <li>Highlight your relevant experience and achievements.</li>
      <li>Provide concrete examples or case studies of past work.</li>
      <li>Be concise, professional, and confident in your tone.</li>
      <li>Ensure your budget is competitive yet fair for your expertise.</li>
    </ul>
  </motion.div>
);
export default TipsToStandOut;