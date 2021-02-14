import styled from 'styled-components';
import { motion } from 'framer-motion';
import { verticalFadeInVariants } from '../styles/Animations';
import {
  GeneralBlueButtonStyles,
  ContainerStyles,
} from '..//styles/GeneralStyles';
export interface WaitingForAnswersProps {
  ProceedToVotingHandler: () => void;
}

const WaitingForAnswers: React.SFC<WaitingForAnswersProps> = ({
  ProceedToVotingHandler,
}) => {
  return (
    <motion.div
      variants={verticalFadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <ContainerStyles>
        <h2 style={{ marginBottom: 50 }}>Waiting for all players to answer</h2>
        <GeneralBlueButtonStyles onClick={ProceedToVotingHandler}>
          Proceed to Voting round
        </GeneralBlueButtonStyles>
      </ContainerStyles>
    </motion.div>
  );
};

export default WaitingForAnswers;
