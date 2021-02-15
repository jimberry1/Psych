export const verticalFadeInVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInFromLeft = {
  hidden: { x: '-100vw', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const PageContainerVariants = {
  hidden: {
    opacity: 0,
    x: '-100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      delay: 0.5,
    },
  },
  exitting: {
    x: '100vw',
    transition: {
      ease: 'easeInOut',
    },
  },
};
