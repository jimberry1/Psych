import { useState } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';
import { GiPartyPopper } from 'react-icons/gi';
import { motion } from 'framer-motion';

export interface ConfettiComponentProps {}

const ConfettiComponent: React.SFC<ConfettiComponentProps> = () => {
  const [width, height] = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  return (
    <div>
      <Confetti width={width} height={height} recycle={showConfetti} />
      <motion.div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 20,
        }}
        whileHover={{
          scale: 1.4,
          color: showConfetti ? '#FF0000' : '#11FF00',
        }}
        whileTap={{
          scale: 1.4,
          color: showConfetti ? '#FF0000' : '#11FF00',
        }}
      >
        <GiPartyPopper
          onClick={() => setShowConfetti((curVal) => !curVal)}
          size={30}
        />
      </motion.div>
    </div>
  );
};

export default ConfettiComponent;
