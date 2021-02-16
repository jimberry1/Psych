import styled from 'styled-components';
import { motion } from 'framer-motion';
import { verticalFadeInVariants } from '../styles/Animations';
import {
  GeneralBlueButtonStyles,
  ContainerStyles,
} from '..//styles/GeneralStyles';
import Lobby from './Lobby/Lobby';
import { useEffect } from 'react';
import { createArrayOfPeopleWhoHaveAnswered } from '../utilities/utilityFunctions';
export interface WaitingForAnswersProps {
  ProceedToVotingHandler: () => void;
  answersArray: any;
  playersArray: any;
  roundNumber: number;
}

const WaitingForAnswers: React.SFC<WaitingForAnswersProps> = ({
  ProceedToVotingHandler,
  answersArray,
  playersArray,
  roundNumber,
}) => {
  return (
    <motion.div
      variants={verticalFadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <ContainerStyles>
        {/* <h2 style={{ marginBottom: 50 }}>Waiting for all players to answer</h2> */}

        <Lobby
          players={createArrayOfPeopleWhoHaveAnswered(
            playersArray,
            answersArray,
            roundNumber
          )}
          showLoader={true}
        />
        <GeneralBlueButtonStyles
          onClick={ProceedToVotingHandler}
          style={{ marginTop: 15 }}
        >
          Proceed to Voting round
        </GeneralBlueButtonStyles>
      </ContainerStyles>
    </motion.div>
  );
};

export default WaitingForAnswers;
