import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

export interface SpinningBlueTickProps {
  delay?: number;
}

const SpinningBlueTick: React.SFC<SpinningBlueTickProps> = ({ delay = 1 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0.2 },
        visible: { rotateY: 720, opacity: 1, transition: { delay: delay } },
        // hover: {
        //   rotateY: 360,
        //   transition: { duration: 2, delay: 0 },
        // },
      }}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <FontAwesomeIcon
        icon={faCheckCircle}
        style={{
          height: 50,
          width: 50,
          borderRadius: '50%',
          padding: '15px',
          color: 'cyan',
        }}
      />
    </motion.div>
  );
};

export default SpinningBlueTick;
