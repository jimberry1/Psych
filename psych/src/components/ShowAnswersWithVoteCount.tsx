import styled from 'styled-components';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { answerType, voteType } from '../types';
import ScoreGraph from './ScoreGraph';

export interface ShowAnswersWithVoteCountProps {
  answersWithVoteTally: answerWithVotes[];
}

type answerWithVotes = {
  name: string;
  answer: string;
  uid: string;
  numberOfVotes: number;
};

const AnswersContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const AnswerContainer = styled.div`
  height: 280px;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #1e2d61;
  color: black;
  font-size: 25px;
  font-family: 'Reggae One', cursive;
  border: 1px solid black;
  border-radius: 10px;
  margin: 15px;
  transition: 0.5s;
  overflow-x: none;

  overflow-wrap: break-word;
  word-wrap: break-word;

  @media (max-width: 600px) {
    font-size: 20px;
  } ;
`;

const AnswerHeader = styled.div`
  width: 80%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid gray;
`;

const FlexStyleCard = {
  flexDirection: 'column',
  justifyContent: 'center',
};

const AnswerHeaderChild = styled.p`
  display: inline;
  word-wrap: break-word;
  color: white;
  word-wrap: break-word;
  font-size: 1.5em;
  overflow-wrap: break-word;
  word-break: break-all;
  padding: 5px;
`;

const AnswerBody = styled.div`
  width: 80%;
  padding: 15px 0px;
  display: flex;
  justify-content: center;
  align-items: flex-top;
  flex: 1;
  color: white;
  word-wrap: break-word;
  word-break: break-all;
`;

const ShowAnswersWithVoteCount: React.SFC<ShowAnswersWithVoteCountProps> = ({
  answersWithVoteTally,
}) => {
  const [topUids, setTopUids]: any[] = useState([]);

  // This useEffect line gets the top results out of the array
  // Do not track the top players if there are less than 4 players in the game, otherwise sort the array then take a slice of the top 3 players and save their Uids in state
  useEffect(() => {
    if (answersWithVoteTally.length < 4) {
      return;
    }
    function answerComparator(
      answer1: answerWithVotes,
      answer2: answerWithVotes
    ) {
      if (answer1.numberOfVotes < answer2.numberOfVotes) {
        return 1;
      } else if (answer1.numberOfVotes > answer2.numberOfVotes) {
        return -1;
      }
      return 0;
    }
    const topPlayerUids = answersWithVoteTally
      .sort(answerComparator)
      .slice(0, 3)
      .map((topAnswer) => topAnswer.uid);

    setTopUids(topPlayerUids);
  }, [answersWithVoteTally]);

  function determineColorOfMedal(uid: string) {
    if (topUids.indexOf(uid) === 0) {
      return 'gold';
    } else if (topUids.indexOf(uid) === 1) {
      return 'silver';
    }
    return '#eb772f';
  }

  return (
    <AnswersContainer>
      {answersWithVoteTally.map((answerWithVote) => {
        return (
          <motion.div
            key={`${answerWithVote.uid} - 1111`}
            variants={{
              interact: {
                y: -10,
                scale: 1.05,
              },
            }}
            whileHover="interact"
            whileTap="interact"
          >
            <AnswerContainer>
              <AnswerHeader>
                <AnswerHeaderChild>{answerWithVote.name}</AnswerHeaderChild>
                <AnswerHeaderChild style={{ wordBreak: 'keep-all' }}>
                  +{answerWithVote.numberOfVotes}
                </AnswerHeaderChild>
                <AnswerHeaderChild>
                  {topUids.includes(answerWithVote.uid) && (
                    <FontAwesomeIcon
                      icon={faMedal}
                      color={determineColorOfMedal(answerWithVote.uid)}
                    />
                  )}
                </AnswerHeaderChild>
              </AnswerHeader>
              <AnswerBody>{answerWithVote.answer}</AnswerBody>
            </AnswerContainer>
          </motion.div>
        );
      })}
    </AnswersContainer>
  );
};

export default ShowAnswersWithVoteCount;
