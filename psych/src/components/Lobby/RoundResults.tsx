import { useState } from 'react';
import db from '../../firebase';
import {
  ContainerStyles,
  GeneralBlueButtonStyles,
  GeneralPageSubTitle,
} from '../../styles/GeneralStyles';
import ResultsTableOrchestrator from '../ResultsTableOrchestrator';
import {
  countVotesForEachAnswerInArrayForAProvidedRound,
  createAnOrderedListOfPlayerScores,
} from '../../utilities/utilityFunctions';
import ShowAnswersWithVoteCount from '../ShowAnswersWithVoteCount';
import ScoreGraph from '../ScoreGraph';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { verticalFadeInVariants } from '../../styles/Animations';
import { answerType, playerType, voteType } from '../../types';

export interface RoundResultsProps {
  gameCode: string | number;
  roundNumber: number;
  user: any;
  numberOfPlayers: number;
  isResultsRound: boolean;
  votesArray: voteType[];
  playersArray: playerType[];
  answersArray: answerType[];
  isHost: boolean;
  numberOfRounds: number;
}

const VotedForMeName = styled.div`
  padding: 5px;
  text-align: center;
  font-size: 20px;
  font-family: 'Secular One', sans-serif;
`;

const RoundResults: React.SFC<RoundResultsProps> = (props) => {
  const [showGraph, setShowGraph] = useState('');
  const nextRoundHandler = () => {
    if (props.roundNumber + 1 > props.numberOfRounds) {
      const roundWinnerUid = createAnOrderedListOfPlayerScores(
        props.playersArray,
        props.votesArray,
        props.roundNumber
      )[0].uid;
      db.collection('games').doc(props.gameCode.toString()).set(
        {
          winner: roundWinnerUid,
        },
        { merge: true }
      );
    } else {
      console.log(
        createAnOrderedListOfPlayerScores(
          props.playersArray,
          props.votesArray,
          props.roundNumber
        )[0].uid
      );
      db.collection('games')
        .doc(props.gameCode.toString())
        .set(
          {
            isResultsRound: false,
            isVotingRound: false,
            isQuestionsRound: true,
            roundNumber: props.roundNumber + 1,
          },
          { merge: true }
        );
    }
  };

  const playersWhoVotedForMe = props.votesArray
    .filter((vote: any) => vote.data.roundNumber === props.roundNumber)
    .filter((vote: any) => vote.data.votedForUid === props.user.uid)
    .map((element: any) => {
      return element.data.voterName;
    });

  return (
    <ContainerStyles>
      {props.isResultsRound && (
        <div style={{ width: '100%' }}>
          <GeneralPageSubTitle>Results</GeneralPageSubTitle>

          {playersWhoVotedForMe.length > 0 && (
            <div style={{ paddingBottom: 20 }}>
              <VotedForMeName style={{ fontSize: 25 }}>
                People who voted for me:{' '}
              </VotedForMeName>
              {playersWhoVotedForMe.map((playerName: any) => {
                return (
                  <VotedForMeName key={playerName}>{playerName}</VotedForMeName>
                );
              })}
            </div>
          )}

          <div
            style={{
              paddingTop: 20,
              borderTop: '1px solid gray',
              transition: 'height 1s',
            }}
          >
            <GeneralPageSubTitle>Scoreboard</GeneralPageSubTitle>
            <AnimatePresence>
              {showGraph && (
                <motion.div
                  variants={verticalFadeInVariants}
                  transition={{ delay: 0.2 }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{
                    margin: 'auto',
                  }}
                >
                  <ScoreGraph
                    playerUid={showGraph}
                    votesArray={props.votesArray}
                    roundNumber={props.roundNumber}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <ResultsTableOrchestrator
              votes={props.votesArray}
              players={props.playersArray}
              roundNumber={props.roundNumber}
              playerSelected={(playerUid: string) => setShowGraph(playerUid)}
              selectedPlayerUid={showGraph}
            />
          </div>
          <div
            style={{
              width: '100vw',
              paddingTop: 30,
              paddingBottom: 20,
              borderTop: '1px solid gray',
            }}
          >
            <GeneralPageSubTitle>Answers</GeneralPageSubTitle>

            <ShowAnswersWithVoteCount
              answersWithVoteTally={countVotesForEachAnswerInArrayForAProvidedRound(
                props.answersArray,
                props.votesArray,
                props.roundNumber
              )}
            />
          </div>

          {props.isHost && (
            <GeneralBlueButtonStyles
              onClick={nextRoundHandler}
              style={{ marginBottom: 20 }}
            >
              {props.roundNumber + 1 > props.numberOfRounds
                ? 'Proceed to final scores'
                : `Proceed to round ${props.roundNumber + 1}`}
            </GeneralBlueButtonStyles>
          )}
        </div>
      )}
    </ContainerStyles>
  );
};

export default RoundResults;
