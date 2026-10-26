import React from 'react';
import { MotionConfig } from 'framer-motion';
import { Services } from '../Services/Services';

// Route wrapper: makes every framer-motion animation on /services respect prefers-reduced-motion.
// Lives in the lazy Services chunk, so framer-motion stays out of the home bundle.
const ServicesRoute: React.FC = () => (
  <MotionConfig reducedMotion="user">
    <Services />
  </MotionConfig>
);

export default ServicesRoute;
