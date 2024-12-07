"use client";

import React from "react";
import { motion } from "framer-motion";
import CardReview from "./CardReview";

const Testimonial = ({ duration }: { duration: number }) => {
  return (
    <motion.div
      animate={{
        translateX: "-50%",
      }}
      transition={{
        duration: duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex items-center gap-6"
    >
      {[
        ...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {Array.from({ length: 7 }).map((_, index) => (
              <CardReview />
            ))}
          </React.Fragment>
        )),
      ]}
    </motion.div>
  );
};

export default Testimonial;
