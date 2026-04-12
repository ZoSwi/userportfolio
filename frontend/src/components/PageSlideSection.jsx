import { motion } from "framer-motion";

export const PageSlideSection = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.14 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
      className="page-snap-section"
    >
      {children}
    </motion.div>
  );
};
