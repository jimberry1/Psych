import { useState, useEffect } from 'react';
import db from '../firebase';
import firebase from 'firebase';
import { motion } from 'framer-motion';
import { fadeInFromLeft } from '../styles/Animations';
import {
  ContainerStyles,
  GeneralBlueButtonStyles,
} from '../styles/GeneralStyles';
import { QuestionAnswer } from '../styles/GamePageStyles';
export interface WaitingForPlayersProps {
  roundNumber: number;
  gameCode: string | number;
  user: any;
  numberOfPlayers: number;
  isVotingRound: boolean;
}

const VotingOnAnswersComponent: React.SFC<WaitingForPlayersProps> = (props) => {
  const [roundAnswers, setRoundAnswers] = useState([]);

  const [userHasVotedalready, setUserHasVotedAlready] = useState(false);

  // We have the round information from props

  // Set up a snapshot listener on the answers
  useEffect(() => {
    const answersDbRef = db
      .collection('games')
      .doc(props.gameCode.toString())
      .collection('answers')
      .where('roundNumber', '==', props.roundNumber)
      .onSnapshot((snap: any) => {
        setRoundAnswers(
          snap.docs.map((answer: any) => ({
            id: answer.id,
            data: answer.data(),
          }))
        );
        // console.log(
        //   `Number of answers (${snap.docs.length}) = total number of players (${props.numberOfPlayers}) so auto progressing to results round`
        // );
        // if (
        //   snap.docs.length > 0 &&
        //   snap.docs.length === props.numberOfPlayers
        // ) {
        //   console.log(
        //     `Number of answers (${snap.docs.length}) = total number of players (${props.numberOfPlayers}) so auto progressing to results round`
        //   );
        //   db.collection('games')
        //     .doc(props.gameCode.toString())
        //     .set({ isVotingRound: false, isResultsRound: true });
        // }
      });
    return answersDbRef;
  }, [props.roundNumber]);

  // Checks to see if we have voted already
  useEffect(() => {
    console.log('checking whether the user has voted already');
    db.collection('games')
      .doc(props.gameCode.toString())
      .collection('votes')
      .where('roundNumber', '==', props.roundNumber)
      .where('voterUid', '==', props.user.uid)
      .get()
      .then((usersVotes) => {
        if (!usersVotes.empty) {
          console.log('user has voted already');
          setUserHasVotedAlready(true);
        }
      });
  }, [props]);

  // This could cause some nasty bugs with rounds ending early -- be careful with this and potentially look for a better solution, potentially the host could determine the end of the round
  // Another good way to do this would be to set a round started value - I think I will do this actually
  //   useEffect(() => {
  //     db.collection('games')
  //       .doc(props.gameCode.toString())
  //       .collection('answers')
  //       .where('roundNumber', '==', props.roundNumber)
  //       .limit(1)
  //       .orderBy('timestamp', 'asc')
  //       .get()
  //       .then((earliestAnswer) => {
  //         if (!earliestAnswer.empty) {
  //           console.log(earliestAnswer.docs[0].data().timestamp.seconds);
  //           const curTime = Math.floor(Date.now() / 1000);
  //           const timeDif =
  //             curTime - earliestAnswer.docs[0].data().timestamp.seconds;

  //           if (curTime > 120) {
  //             db.collection('games')
  //               .doc(props.gameCode.toString())
  //               .set({ isVotingRound: true }, { merge: true });
  //           } else {
  //             setTimeout(() => {
  //               db.collection('games')
  //                 .doc(props.gameCode.toString())
  //                 .set({ isVotingRound: true }, { merge: true });
  //             }, timeDif);
  //           }
  //         }
  //       });
  //   }, [props.roundNumber]);

  const castVoteHandler = (uid: string, name: string) => {
    console.log('castVoteHandler invoked with uid = ' + uid);
    if (!userHasVotedalready) {
      db.collection('games')
        .doc(props.gameCode.toString())
        .collection('votes')
        .add({
          voterUid: props.user.uid,
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

  const ProceedToResultsHandler = () => {
    db.collection('games')
      .doc(props.gameCode.toString())
      .set({ isVotingRound: false, isResultsRound: true }, { merge: true });
  };

  return (
    <ContainerStyles>
      {!userHasVotedalready && <h1>ANSWERS!</h1>}
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
          roundAnswers.map((answer: any, index) => {
            console.log(index);
            return (
              <motion.div
                variants={{
                  hidden: { x: index % 2 == 0 ? '-100vw' : '100vw' },
                  visible: { x: 0 },
                  hover: { scale: 1.1 },
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
                onClick={() =>
                  castVoteHandler(answer.data.uid, answer.data.name)
                }
              >
                <QuestionAnswer>{answer.data.answer}</QuestionAnswer>
              </motion.div>
            );
          })}
        {userHasVotedalready && <span>Thank you for casting your vote!</span>}
        <br />
        <GeneralBlueButtonStyles
          onClick={ProceedToResultsHandler}
          style={{ marginTop: 50 }}
        >
          Proceed to results
        </GeneralBlueButtonStyles>
      </motion.div>
    </ContainerStyles>
  );
};

export default VotingOnAnswersComponent;
