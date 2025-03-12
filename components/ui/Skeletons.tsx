import React from 'react';
import { motion } from 'framer-motion';

const shimmer = {
  initial: { x: '-100%' },
  animate: { 
    x: '100%',
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear'
    }
  }
};

export const TitleSkeleton = () => (
  <div className="relative w-full h-16 bg-gray-800 rounded-lg overflow-hidden">
    <motion.div
      variants={shimmer}
      initial="initial"
      animate="animate"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
    />
  </div>
);

export const TextSkeleton = () => (
  <div className="relative w-full h-6 bg-gray-800 rounded overflow-hidden">
    <motion.div
      variants={shimmer}
      initial="initial"
      animate="animate"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
    />
  </div>
);

export const ButtonSkeleton = () => (
  <div className="relative w-40 h-12 bg-gray-800 rounded-lg overflow-hidden">
    <motion.div
      variants={shimmer}
      initial="initial"
      animate="animate"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
    />
  </div>
);

export const CardSkeleton = () => (
  <div className="relative bg-gray-800 p-8 rounded-xl overflow-hidden">
    <div className="space-y-4">
      <div className="w-16 h-16 bg-gray-700 rounded-lg" />
      <div className="w-3/4 h-6 bg-gray-700 rounded" />
      <div className="space-y-2">
        <div className="w-full h-4 bg-gray-700 rounded" />
        <div className="w-5/6 h-4 bg-gray-700 rounded" />
      </div>
    </div>
    <motion.div
      variants={shimmer}
      initial="initial"
      animate="animate"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
    />
  </div>
);

export const SVGSkeleton = () => (
  <div className="relative w-[400px] h-[400px] bg-gray-800 rounded-xl overflow-hidden">
    <motion.div
      variants={shimmer}
      initial="initial"
      animate="animate"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
    />
  </div>
);
