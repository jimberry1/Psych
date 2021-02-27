import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { voteType, answerType, playerType } from '../types';
import db from '../firebase';
import firebase from 'firebase';
import VotingOnAnswersComponent from '../components/VotingOnAnswersComponent';
import RoundResults from '../components/Lobby/RoundResults';
import QuestionComponent from '../components/QuestionComponent';
import WaitingForAnswers from '../components/WaitingForAnswers';
import { verticalFadeInVariants } from '../styles/Animations';
import { Redirect } from 'react-router';
import CountDownClock from '../components/CountDownClock';
const GamePage = (props: any) => {
  const [gameInfo, setGameInfo]: any = useState(null);
  const [players, setPlayers] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [votes, setVotes] = useState([]);
  const [questionIndex, setQuestionIndex] = useState([]);
  const [randomNameArray, setRandomNameArray] = useState([]);
  const [question, setQuestion] = useState('');
  const [roundNumber, setRoundNumber] = useState(0);
  const [isQuestionsRound, setIsQuestionsRound] = useState(false);
  const [isVotingRound, setIsVotingRound] = useState(false);
  const [hasAlreadyAnswered, setHasAlreadyAnswered] = useState(false);
  const [isResultsRound, setIsResultsRound] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [customQuestionCollectionId, setCustomQuestionCollectionId] = useState(
    ''
  );

  // Establishes a snapshot listner on the main games lobby
  useEffect(() => {
    const snapshot = db
      .collection('games')
      .doc(props.gameCode.toString())
      .onSnapshot((fetchedQuestionSnapshot: any) => {
        setGameInfo(fetchedQuestionSnapshot.data());

        setRoundNumber(fetchedQuestionSnapshot.data().roundNumber);
        setQuestionIndex(fetchedQuestionSnapshot.data().questionIndex);
        setIsQuestionsRound(fetchedQuestionSnapshot.data().isQuestionsRound);
        setIsVotingRound(fetchedQuestionSnapshot.data().isVotingRound);
        setIsResultsRound(fetchedQuestionSnapshot.data().isResultsRound);
        setRandomNameArray(fetchedQuestionSnapshot.data().randomNameArray);
        setIsHost(
          fetchedQuestionSnapshot.data().hostUid === props.user.uid
            ? true
            : false
        );
        setCustomQuestionCollectionId(
          fetchedQuestionSnapshot.data().customQuestionCollectionId
        );
      });
    return snapshot;
  }, []);

  // Establishes snapshot listener to the players subcollection
  useEffect(() => {
    const playersSnapshot = db
      .collection('games')
      .doc(props.gameCode.toString())
      .collection('players')
      .onSnapshot((playersSnap: any) => {
        if (!playersSnap.empty) {
          setPlayers(
            playersSnap.docs.map((player: any) => ({
              id: player.id,
              data: player.data(),
            }))
          );
        }
      });
    return playersSnapshot;
  }, []);

  // Establishes snapshot listener to the answers subcollection
  useEffect(() => {
    const answersDbRef = db
      .collection('games')
      .doc(props.gameCode.toString())
      .collection('answers')
      // .where('roundNumber', '==', props.roundNumber) //removed this as we want all answers in the snapshot
      .onSnapshot((snap: any) => {
        setAnswers(
          snap.docs.map((answer: any) => ({
            id: answer.id,
            data: answer.data(),
          }))
        );
      });
    return answersDbRef;
  }, []);

  //Establishes snapshot listener to the votes subcollection
  useEffect(() => {
    const votesSnapshot = db
      .collection('games')
      .doc(props.gameCode.toString())
      .collection('votes')
      // .where('roundNumber', '==', props.roundNumber)
      .onSnapshot((snap: any) => {
        setVotes(
          snap.docs.map((vote: any) => ({ id: vote.id, data: vote.data() }))
        );
        if (
          snap.docs.filter(
            (record: any) => record.data().roundNumber === roundNumber
          ).length > 0 &&
          snap.docs.length === props.numberOfPlayers
        ) {
          console.log(
            `Auto progressing to the results round as the system as determined that of the ${props.numberOfPlayers} players in the game, all have voted as there are ${snap.docs.length} votes`
          );
          db.collection('games')
            .doc(props.gameCode.toString())
            .set(
              { isResultsRound: true, isVotingRound: false },
              { merge: true }
            );
        }
      });
    return votesSnapshot;
  }, []);

  // Gets the question for the round using the information from the games collectiom
  useEffect(() => {
    if (!questionIndex) {
      return;
    }
    if (
      questionIndex.length > 0 &&
      roundNumber > 0 &&
      questionIndex.length > roundNumber
    ) {
      if (customQuestionCollectionId) {
        // If the custom collection id is set then use that to get the question
        db.collection('customQuestions')
          .doc(customQuestionCollectionId)
          .collection('questions')
          .where('index', '==', questionIndex[roundNumber])
          .limit(1)
          .get()
          .then((questionQuery) => {
            if (!questionQuery.empty) {
              setQuestion(questionQuery.docs[0].data().question);
            }
          });
      } else {
        // If the custom collection id isn't set then get the questions from the default collection
        db.collection('questions')
          .where('index', '==', questionIndex[roundNumber])
          .limit(1)
          .get()
          .then((questionQuery) => {
            if (!questionQuery.empty) {
              setQuestion(questionQuery.docs[0].data().question);
            }
          });
      }
    }
  }, [roundNumber, questionIndex, customQuestionCollectionId]);

  // Queries the answers collection to see if the user has already answered this round's question
  useEffect(() => {
    if (roundNumber > 0) {
      db.collection('games')
        .doc(props.gameCode.toString())
        .collection('answers')
        .where('roundNumber', '==', roundNumber)
        .where('uid', '==', props.user.uid)
        .get()
        .then((answerQuery) => {
          setHasAlreadyAnswered(!answerQuery.empty);
        });
    }
  }, [roundNumber]);

  // Controls how we automatically progress to the voting round
  useEffect(() => {
    if (answers) {
      if (
        answers.filter((ans: any) => ans.data.roundNumber === roundNumber)
          .length >= players.length &&
        !isVotingRound &&
        !isResultsRound &&
        isQuestionsRound
      ) {
        console.log('Proceeding to voting round');
        ProceedToVotingHandler();
      }
    }
  }, [answers]);

  // Controls how we automatically progress to the results round
  useEffect(() => {
    if (votes) {
      if (
        votes.filter((vote: any) => vote.data.roundNumber === roundNumber)
          .length >= players.length &&
        isVotingRound &&
        !isResultsRound &&
        !isQuestionsRound
      ) {
        console.log('Proceeding to results round');
        ProceedToResultsHandler();
      }
    }
  }, [votes]);

  // Submits the answer if the player's answer is longer than 0 characters and the user has not already answered the question
  const submitAnswerHandler = () => {
    if (!hasAlreadyAnswered) {
      if (answer.length > 0) {
        db.collection('games')
          .doc(props.gameCode.toString())
          .collection('answers')
          .add({
            name: props.user.name,
            uid: props.user.uid,
            answer: answer,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            roundNumber: roundNumber,
          });

        setHasAlreadyAnswered(true);
        setAnswer('');
      }
    }
  };

  // Handles the progression to the voting round
  const ProceedToVotingHandler = () => {
    db.collection('games')
      .doc(props.gameCode.toString())
      .set(
        { isVotingRound: true, isResultsRound: false, isQuestionsRound: false },
        { merge: true }
      );
  };

  // Handles the progression to the results round
  const ProceedToResultsHandler = () => {
    db.collection('games')
      .doc(props.gameCode.toString())
      .set(
        { isVotingRound: false, isResultsRound: true, isQuestionsRound: false },
        { merge: true }
      );
  };

  const substituteNameIntoQuestion = (
    question: string,
    arrayOfNames: any[],
    roundNumber: number
  ) => {
    return question
      .replace(
        'xxx',
        randomNameArray.length >= roundNumber
          ? arrayOfNames[roundNumber]
          : 'ERROR - NO NAME FOUND'
      )
      .replace(
        'XXX',
        randomNameArray.length >= roundNumber
          ? arrayOfNames[roundNumber]
          : 'ERROR - NO NAME FOUND'
      );
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {!hasAlreadyAnswered && isQuestionsRound && (
        <motion.div
          key={10000000001}
          variants={verticalFadeInVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <QuestionComponent
            question={substituteNameIntoQuestion(
              question,
              randomNameArray,
              roundNumber
            )}
            answer={answer}
            answerChangedHandler={(newAnswer) => setAnswer(newAnswer)}
            submitAnswerHandler={() => submitAnswerHandler()}
            gameCode={props.gameCode}
            roundDurationTimer={gameInfo.timeLimit}
            roundTimerRunsOutOfTimeHandler={ProceedToVotingHandler}
          />
        </motion.div>
      )}
      {hasAlreadyAnswered && isQuestionsRound && (
        <motion.div
          key={10000000002}
          variants={verticalFadeInVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <WaitingForAnswers
            ProceedToVotingHandler={ProceedToVotingHandler}
            answersArray={answers}
            playersArray={players}
            roundNumber={roundNumber}
            isHost={isHost}
          />
        </motion.div>
      )}

      {isVotingRound && !isQuestionsRound && !isResultsRound && (
        <motion.div
          key={10000000003}
          variants={verticalFadeInVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <VotingOnAnswersComponent
            roundNumber={roundNumber}
            gameCode={props.gameCode}
            user={props.user}
            numberOfPlayers={players.length}
            isVotingRound={isVotingRound}
            answers={answers.filter(
              (answer: any) => answer.data.roundNumber === roundNumber //filtered to ensure only the current round questions are displayed
            )}
            playersArray={players}
            votesArray={votes}
            isHost={isHost}
            proceedToResultsRound={ProceedToResultsHandler}
            question={substituteNameIntoQuestion(
              question,
              randomNameArray,
              roundNumber
            )}
            roundDurationTimer={gameInfo.timeLimit}
            roundTimerRunsOutOfTimeHandler={ProceedToResultsHandler}
          />
        </motion.div>
      )}
      {!isVotingRound && !isQuestionsRound && isResultsRound && (
        <motion.div
          key={10000000004}
          variants={verticalFadeInVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <RoundResults
            gameCode={props.gameCode}
            user={props.user}
            roundNumber={roundNumber}
            numberOfPlayers={players.length}
            isResultsRound={isResultsRound}
            votesArray={votes}
            playersArray={players}
            isHost={isHost}
            answersArray={answers}
          />
        </motion.div>
      )}
      {gameInfo?.winner && <Redirect to="/endOfGame" />}
    </AnimatePresence>
  );
};

export default GamePage;

export interface GamePageProps {
  gameCode: string | number;
  user: any;
}
