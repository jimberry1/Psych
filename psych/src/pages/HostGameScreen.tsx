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
import HostGameCustomisationControls from '../components/HostGameCustomisationControls';
import { GeneralPageSubTitle } from '../styles/GeneralStyles';
import CustomCollectionDisplay from '../components/CustomCollectionDisplay';
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
  const [numberOfQuestions, setNumberOfQuestions] = useState(70); // Defaulted to 70 but is updated with a useEffect call to the database at the start
  const [redirectTo, setRedirectTo] = useState('');
  const [roundNumberSelected, setRoundNumberSelected] = useState(10);
  const [timeLimitSelected, setTimeLimitSelected] = useState(-1);
  const [
    playerNumberAutoprogressThreshold,
    setPlayerNumberAutoprogressThreshold,
  ] = useState(-1);
  const [customQuestionsInUse, setCustomQuestionsInUse] = useState(false);
  const [numberOfCustomQuestions, setNumberOfCustomQuestions] = useState(-1);
  const [questionCollectionId, setQuestionCollectionId] = useState('');
  const [selectedQuestionSet, setSelectedQuestionSet] = useState(0);

  // Get the number of questions in the questions component
  useEffect(() => {
    db.collection('questions')
      .doc('Indexor')
      .get()
      .then((doc) => {
        setNumberOfQuestions(doc.get('index'));
      });
  }, []);

  // Create a snapshot listener for the players
  useEffect(() => {
    const playerDbRef = db
      .collection('games')
      .doc(props.gameCode.toString())
      .collection('players');

    const snapshot = playerDbRef.onSnapshot((docSnapshot: any) => {
      setPlayers(
        docSnapshot.docs.map((doc: any) => ({ id: doc.id, data: doc.data() }))
      );
    });
    return snapshot;
  }, [props.gameCode]);

  const startGameHandler = () => {
    //Change this to be the number of rounds and the total number of questions in the database that we'll get from doing a query search

    // Create a new questions array -- This will need to be changed in the future to use the questions db table and the number of available questions there

    let questionsIndex: number[];
    if (customQuestionsInUse) {
      questionsIndex = questionArrayGenerator(
        roundNumberSelected,
        numberOfCustomQuestions
      );
    } else {
      questionsIndex = questionArrayGenerator(
        roundNumberSelected,
        numberOfQuestions
      );
    }

    const randomlyPickedPlayersForQuestions = randomlyPickNamesForQuestions(
      players,
      roundNumberSelected
    );

    db.collection('games')
      .doc(props.gameCode.toString())
      .set(
        {
          gameStarted: true,
          isQuestionsRound: true,
          questionIndex: questionsIndex,
          randomNameArray: randomlyPickedPlayersForQuestions,
          hostUid: props.user.uid,
          timeLimit: timeLimitSelected,
          numberOfRounds: roundNumberSelected,
          autoProgressionThreshold: playerNumberAutoprogressThreshold,
          customQuestionCollectionId: questionCollectionId,
        },
        { merge: true }
      )
      .catch((err) => console.log(err))
      .then(() => {
        setRedirectTo('/game');
      });
  };

  const searchForQuestionsByCollectionIdHandler = (
    questionCollectionId: string
  ) => {
    console.log('Invoked with id= ' + questionCollectionId);

    db.collection('customQuestions')
      .doc(questionCollectionId)
      .collection('questions')
      .doc('Indexor')
      // .collection('questions')
      .get()
      .then((customQuestions) => {
        if (customQuestions.exists) {
          if (customQuestions.get('index') < roundNumberSelected) {
            props.handleError(
              `The custom question collection was found, however it only contains ${customQuestions.get(
                'index'
              )} questions which is fewer than the number of rounds and therefore has not been selected.`
            );
          } else {
            setCustomQuestionsInUse(true);
            setNumberOfCustomQuestions(customQuestions.get('index'));
            setQuestionCollectionId(questionCollectionId);
          }
        } else {
          props.handleError(
            `No custom questions found for game code '${questionCollectionId}'`
          );
        }
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
      <GeneralPageSubTitle>Questions</GeneralPageSubTitle>
      <CustomCollectionDisplay
        searchForQuestionCollectionById={(questionCollectionId: string) =>
          searchForQuestionsByCollectionIdHandler(questionCollectionId)
        }
        handleInfoButton={(text: string) => props.handleError(text)}
        numberOfCustomQuestions={numberOfCustomQuestions}
        parentQuestionCollectionId={questionCollectionId}
        selectedQuestionSet={selectedQuestionSet}
        setSelectedQuestionSet={(gameModeCode: number) => {
          setSelectedQuestionSet(gameModeCode);
          if (gameModeCode === 0) {
            setCustomQuestionsInUse(false);
            setQuestionCollectionId('');
          }
        }}
      />
      <GeneralPageSubTitle>Game Controls</GeneralPageSubTitle>
      <HostGameCustomisationControls
        roundNumberSelected={roundNumberSelected}
        setRoundNumberSelected={(roundNumber: number) => {
          if (
            !customQuestionsInUse ||
            (customQuestionsInUse && roundNumber < numberOfCustomQuestions)
          ) {
            setRoundNumberSelected(roundNumber);
          } else {
            props.handleError(
              `Cannot change number of rounds to ${roundNumber} because it is greater than the number of questions in the custom question collection`
            );
          }
        }}
        timeLimitSelected={timeLimitSelected}
        setTimeLimitSelected={(timeLimit: number) =>
          setTimeLimitSelected(timeLimit)
        }
        playerNumberAutoprogressThreshold={playerNumberAutoprogressThreshold}
        setPlayerNumberAutoprogressThreshold={(autoProgressThreshold: number) =>
          setPlayerNumberAutoprogressThreshold(autoProgressThreshold)
        }
      />
      <GeneralPageSubTitle>Players</GeneralPageSubTitle>
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
