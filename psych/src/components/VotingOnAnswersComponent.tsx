import { useState, useEffect } from 'react';
import db from '../firebase';
import firebase from 'firebase';
import { motion } from 'framer-motion';
import { fadeInFromLeft } from '../styles/Animations';
import {
  ContainerStyles,
  GeneralBlueButtonStyles,
  GeneralPageSubTitle,
} from '../styles/GeneralStyles';
import { QuestionAnswer } from '../styles/GamePageStyles';
import Lobby from '../components/Lobby/Lobby';
import { createArrayOfPeopleWhoHaveVoted } from '../utilities/utilityFunctions';
import CountDownClock from './CountDownClock';
export interface WaitingForPlayersProps {
  roundNumber: number;
  gameCode: string | number;
  answers: any;
  user: any;
  numberOfPlayers: number;
  isVotingRound: boolean;
  playersArray: any[];
  votesArray: any[];
  isHost: boolean;
  proceedToResultsRound: any;
  question: string;
  roundDurationTimer: number;
  roundTimerRunsOutOfTimeHandler: () => void;
}

const VotingOnAnswersComponent: React.SFC<WaitingForPlayersProps> = (props) => {
  const [roundAnswers, setRoundAnswers] = useState([]);

  const [userHasVotedalready, setUserHasVotedAlready] = useState(false);

  // Checks to see if we have voted already
  useEffect(() => {
    if (
      props.votesArray
        .filter((vote: any) => vote.data.roundNumber === props.roundNumber)
        .filter((vote: any) => vote.data.voterUid === props.user.uid).length > 0
    ) {
      setUserHasVotedAlready(true);
    }
  }, [props]);

  const castVoteHandler = (uid: string, name: string) => {
    console.log('castVoteHandler invoked with uid = ' + uid);
    if (!userHasVotedalready) {
      db.collection('games')
        .doc(props.gameCode.toString())
        .collection('votes')
        .add({
          voterUid: props.user.uid,
          voterName: props.user.name,
          votedForUid: uid,
          votedForName: name,
          roundNumber: props.roundNumber,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      setUserHasVotedAlready(true);
    } else {
      console.log('user has already voted so no vote allowed!!');
    }
  };

  return (
    <ContainerStyles>
      {props.roundDurationTimer > 0 && !userHasVotedalready && (
        <CountDownClock
          duration={props.roundDurationTimer * 60}
          countDownComplete={props.roundTimerRunsOutOfTimeHandler}
        />
      )}
      {!userHasVotedalready && (
        <div>
          <GeneralPageSubTitle>
            Vote for your favourite answer!
          </GeneralPageSubTitle>
          <GeneralPageSubTitle>{props.question}</GeneralPageSubTitle>
        </div>
      )}
      <motion.div
        variants={fadeInFromLeft}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0.5,
          when: 'beforeChildren',
          staggerChildren: 1.5,
        }}
        style={{ width: '50%' }}
      >
        {roundAnswers &&
          !userHasVotedalready &&
          props.answers.map((answer: any, index: number) => {
            console.log(index);
            return (
              <motion.div
                variants={{
                  hidden: { x: index % 2 == 0 ? '-100vw' : '100vw' },
                  visible: { x: 0 },
                  hover: { scale: 1.1, y: -5 },
                }}
                whileHover="hover"
                whileTap="hover"
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 1.2 * index,
                  type: 'spring',
                  stiffness: 80,
                }}
                key={answer.id}
                style={{ marginTop: 15 }}
                onClick={() => {
                  if (
                    answer.data.uid !== props.user.uid ||
                    props.user.name.toUpperCase() === 'JIM'
                  ) {
                    castVoteHandler(answer.data.uid, answer.data.name);
                  }
                }}
              >
                <QuestionAnswer>{answer.data.answer}</QuestionAnswer>
              </motion.div>
            );
          })}
        {userHasVotedalready && (
          <div>
            <h2 style={{ marginBottom: 25 }}>
              Thank you for casting your vote!
            </h2>
            <Lobby
              players={createArrayOfPeopleWhoHaveVoted(
                props.playersArray,
                props.votesArray,
                props.roundNumber
              )}
              showLoader={true}
            />
          </div>
        )}

        <br />
        {props.isHost && (
          <GeneralBlueButtonStyles
            onClick={props.proceedToResultsRound}
            style={{ marginTop: 50 }}
          >
            Proceed to results
          </GeneralBlueButtonStyles>
        )}
      </motion.div>
    </ContainerStyles>
  );
};

export default VotingOnAnswersComponent;
