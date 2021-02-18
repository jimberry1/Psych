import styled from 'styled-components';
import { motion } from 'framer-motion';
import { verticalFadeInVariants } from '../styles/Animations';
import {
  GeneralBlueButtonStyles,
  ContainerStyles,
  GeneralPageSubTitle,
} from '..//styles/GeneralStyles';
import Lobby from './Lobby/Lobby';
import { useEffect } from 'react';
import { createArrayOfPeopleWhoHaveAnswered } from '../utilities/utilityFunctions';
export interface WaitingForAnswersProps {
  ProceedToVotingHandler: () => void;
  answersArray: any[];
  playersArray: any[];
  roundNumber: number;
  isHost: boolean;
}

const WaitingForAnswers: React.SFC<WaitingForAnswersProps> = ({
  ProceedToVotingHandler,
  answersArray,
  playersArray,
  roundNumber,
  isHost,
}) => {
  return (
    // <motion.div
    //   variants={verticalFadeInVariants}
    //   initial="hidden"
    //   animate="visible"
    // >
    <ContainerStyles>
      <GeneralPageSubTitle style={{ marginBottom: 50 }}>
        Waiting for all players to answer
      </GeneralPageSubTitle>

      <Lobby
        players={createArrayOfPeopleWhoHaveAnswered(
          playersArray,
          answersArray,
          roundNumber
        )}
        showLoader={true}
      />
      {isHost && (
        <GeneralBlueButtonStyles
          onClick={ProceedToVotingHandler}
          style={{ marginTop: 15 }}
        >
          Proceed to Voting round
        </GeneralBlueButtonStyles>
      )}
    </ContainerStyles>
    // </motion.div>
  );
};

export default WaitingForAnswers;
