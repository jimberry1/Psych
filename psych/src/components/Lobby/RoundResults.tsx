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

const RoundResults: React.SFC<RoundResultsProps> = (props) => {
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

          <p>
            My score +
            {
              props.votesArray
                .filter(
                  (vote: any) => vote.data.roundNumber === props.roundNumber
                )
                .filter((vote: any) => vote.data.votedForUid === props.user.uid)
                .length
            }
          </p>
          {playersWhoVotedForMe.length > 0 && (
            <div>
              <p>People who voted for me: </p>
              {playersWhoVotedForMe.map((playerName: any) => {
                return <div key={playerName}>{playerName}</div>;
              })}
            </div>
          )}

          <ShowAnswersWithVoteCount
            answersWithVoteTally={countVotesForEachAnswerInArrayForAProvidedRound(
              props.answersArray,
              props.votesArray,
              props.roundNumber
            )}
          />
          <ResultsTableOrchestrator
            votes={props.votesArray}
            players={props.playersArray}
            roundNumber={props.roundNumber}
          />
          {props.isHost && (
            <GeneralBlueButtonStyles onClick={nextRoundHandler}>
              Proceed to round {props.roundNumber + 1}
            </GeneralBlueButtonStyles>
          )}
        </div>
      )}
    </ContainerStyles>
  );
};

export default RoundResults;
