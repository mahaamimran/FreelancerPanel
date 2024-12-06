import React from "react";
import { motion } from "framer-motion";

const TipsToStandOut = ({ tips }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="bg-blue-50 p-6 rounded-lg shadow-lg"
  >
    <h3 className="text-lg font-semibold text-primary mb-4">💡 Tips to Stand Out</h3>
    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
      {tips.map((tip, index) => (
        <li key={index}>{tip}</li>
      ))}
    </ul>
  </motion.div>
);

export default TipsToStandOut;
