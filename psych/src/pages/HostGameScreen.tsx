import HostGameContainer from '../containers/HostGameContainer';
import { useState, useEffect } from 'react';
import db from '../firebase';
import Lobby from '../components/Lobby/Lobby';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import { motion } from 'framer-motion';
import { verticalFadeInVariants } from '../styles/Animations';
import { StartButton } from '../UI/ButtonStyle1';
import { PageContainerVariants } from '../styles/Animations';
import {
  questionArrayGenerator,
  randomlyPickNamesForQuestions,
} from '../utilities/utilityFunctions';
// import { randomlyPickNamesForQuestions } from '../utilities/utilityFunctions';

const ButtonContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const HostGameScreen = (props: any) => {
  const [players, setPlayers] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(15);
  const [redirectTo, setRedirectTo] = useState('');

  // Get the number of questions in the questions component
  useEffect(() => {
    db.collection('questions')
      .doc('Indexor')
      .get()
      .then((doc) => {
        console.log(doc.get('index'));
        setNumberOfQuestions(doc.get('index'));
      });
  }, []);

  // Create a snapshot listener for the players
  useEffect(() => {
    const playerDbRef = db
      .collection('games')
      .doc(props.gameCode.toString())
      .collection('players');

    // if (props.gameCode) {
    console.log(
      'this is the game code when fetching the people ' +
        props.gameCode.toString()
    );

    const snapshot = playerDbRef.onSnapshot((docSnapshot: any) => {
      setPlayers(
        docSnapshot.docs.map((doc: any) => ({ id: doc.id, data: doc.data() }))
      );
      console.log(
        docSnapshot.docs.map((doc: any) => ({ id: doc.id, data: doc.data() }))
      );
    });
    // }
    return snapshot;
  }, [props.gameCode]);

  const startGameHandler = () => {
    // const randomNames = randomlyPickNamesForQuestions(players, 15);
    // console.log(randomNames);
    //Change this to be the number of rounds and the total number of questions in the database that we'll get from doing a query search

    // Create a new questions array -- This will need to be changed in the future to use the questions db table and the number of available questions there
    const questionsIndex = questionArrayGenerator(15, numberOfQuestions);

    const randomlyPickedPlayersForQuestions = randomlyPickNamesForQuestions(
      players,
      15
    );

    console.log(randomlyPickedPlayersForQuestions);

    db.collection('games')
      .doc(props.gameCode.toString())
      .set(
        {
          gameStarted: true,
          questionIndex: questionsIndex,
          randomNameArray: randomlyPickedPlayersForQuestions,
          hostUid: props.user.uid,
        },
        { merge: true }
      )
      .catch((err) => console.log(err))
      .then(() => {
        setRedirectTo('/game');
      });
  };
  return (
    <motion.div
      variants={PageContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {redirectTo.length > 0 && <Redirect push to={redirectTo} />}
      <HostGameContainer lobbyCode={props.gameCode} />
      {players[0] && <Lobby players={players} />}
      <ButtonContainer
        variants={verticalFadeInVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2 }}
      >
        <StartButton onClick={startGameHandler}>Start!</StartButton>
      </ButtonContainer>
    </motion.div>
  );
};

export default HostGameScreen;

export interface HostGameScreenProps {}
