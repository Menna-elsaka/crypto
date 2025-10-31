import React from 'react';
import { motion, useInView } from 'framer-motion'; // Add useInView if needed, but whileInView is sufficient

export default function CardHome({ icon, title, desc }) {
  return (
    <motion.div
      className="p-5 shadow-[0_1px_5px_rgba(191,132,250,0.5)] border hover:-translate-y-2 rounded-lg w-[300px] h-[200px] bg-[#251d4f] cursor-pointer border-[#4c2b83] hover:scale-105 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }} // Trigger animation when in view
      viewport={{ once: true, amount: 0.3 }} // Animate once when 30% visible
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        y: -10,
        boxShadow: "0 15px 40px rgba(191,132,250,0.7)",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col gap-6">
        <motion.div
          className="text-purple-400 purple-text"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {icon}
        </motion.div>
        <motion.h2
          className="text-purple-300 text-xl font-semibold"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-gray-400 font-medium text-sm"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {desc}
        </motion.p>
      </div>
    </motion.div>
  );
}
