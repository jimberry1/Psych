import { useState, useEffect } from 'react';
import db from '../../firebase';
import {
  ContainerStyles,
  GeneralBlueButtonStyles,
  GeneralPageSubTitle,
} from '../../styles/GeneralStyles';
import ResultsTableOrchestrator from '../ResultsTableOrchestrator';
import { countVotesForEachAnswerInArrayForAProvidedRound } from '../../utilities/utilityFunctions';
import ShowAnswersWithVoteCount from '../ShowAnswersWithVoteCount';
import ScoreGraph from '../ScoreGraph';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import {
  fadeInFromLeft,
  verticalFadeInVariants,
} from '../../styles/Animations';

export interface RoundResultsProps {
  gameCode: string | number;
  roundNumber: number;
  user: any;
  numberOfPlayers: number;
  isResultsRound: boolean;
  votesArray: any;
  playersArray: any;
  answersArray: any[];
  isHost: boolean;
}

const MyResultsSection = styled.div``;

const VotedForMeName = styled.div`
  padding: 5px;
  text-align: center;
  font-size: 20px;
  font-family: 'Secular One', sans-serif;
`;

const RoundResults: React.SFC<RoundResultsProps> = (props) => {
  const [showGraph, setShowGraph] = useState('');
  const nextRoundHandler = () => {
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
  };

  const playersWhoVotedForMe = props.votesArray
    .filter((vote: any) => vote.data.roundNumber === props.roundNumber)
    .filter((vote: any) => vote.data.votedForUid === props.user.uid)
    .map((element: any) => {
      return element.data.voterName;
    });

  console.log(
    countVotesForEachAnswerInArrayForAProvidedRound(
      props.answersArray,
      props.votesArray,
      props.roundNumber
    )
  );
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
              Proceed to round {props.roundNumber + 1}
            </GeneralBlueButtonStyles>
          )}
        </div>
      )}
    </ContainerStyles>
  );
};

export default RoundResults;
