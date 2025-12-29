'use client';

import { motion } from 'framer-motion';

export default function SplashScreen() {
  // Animation variants for the N bars (ribbon effect)
  const leftBarVariants = {
    hidden: { 
      scaleY: 0,
      opacity: 0,
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const diagonalBarVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
      },
    },
  };

  const rightBarVariants = {
    hidden: { 
      scaleY: 0,
      opacity: 0,
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: [1, 1.5, 2],
          opacity: [1, 0.8, 0],
        }}
        transition={{
          duration: 1,
          delay: 1.5,
          times: [0, 0.5, 1],
        }}
      >
        {/* N Logo using filled bars for ribbon effect */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Left bar */}
          <motion.div
            className="absolute bg-red-600"
            style={{
              left: '20%',
              top: '20%',
              width: '12%',
              height: '60%',
            }}
            variants={leftBarVariants}
            initial="hidden"
            animate="visible"
          />
          
          {/* Diagonal bar */}
          <motion.div
            className="absolute bg-red-600 origin-top-left"
            style={{
              left: '20%',
              top: '20%',
              width: '12%',
              height: '85%',
              transform: 'rotate(45deg)',
              transformOrigin: 'top left',
            }}
            variants={diagonalBarVariants}
            initial="hidden"
            animate="visible"
          />
          
          {/* Right bar */}
          <motion.div
            className="absolute bg-red-600"
            style={{
              right: '20%',
              top: '20%',
              width: '12%',
              height: '60%',
            }}
            variants={rightBarVariants}
            initial="hidden"
            animate="visible"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

