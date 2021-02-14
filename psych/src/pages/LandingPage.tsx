import {
  PageContainer,
  TitleStyles,
  GameControlButton,
  GameCodeInput,
  ButtonContainer,
  GameCodeInputColumn,
} from '../styles/LandingPageStyles';
import { StartButton } from '../UI/ButtonStyle1';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import db from '../firebase';
import { Redirect } from 'react-router';
import {
  makeRandomGameId,
  questionArrayGenerator,
} from '../utilities/utilityFunctions';

const LandingPage = (props: any) => {
  const [showGameCodeInput, setShowGameCodeInput] = useState(false);
  const [redirectTo, setRedirectTo] = useState('');

  const joinNewGameHandler = () => {
    console.log('attempting to join game with gamecode' + props.gameCode);

    db.collection('games')
      .doc(props.gameCode.toString())
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('game found!');
          db.collection('games')
            .doc(props.gameCode.toString())
            .collection('players')
            .where('uid', '==', props.user.uid)
            .get()
            .then((recordOfPlayer) => {
              if (recordOfPlayer.empty) {
                console.log('record is empty');
                db.collection('games')
                  .doc(props.gameCode.toString())
                  .collection('players')
                  .add({
                    name: props.user.name,
                    uid: props.user.uid,
                    answer: '',
                  });
              } else {
                console.log('Player is already in that game');
              }
            });

          db.collection('users')
            .doc(props.user.uid)
            .update({ gameCode: props.gameCode });

          setShowGameCodeInput(false);
          setRedirectTo('/lobby');
        } else {
          console.log('no game found with ...');
          props.handleError(`No game found with ${props.gameCode} game code`);
        }
      })
      .catch((err) => console.log(err));
  };

  const HostGameHandler = () => {
    // First thing is to make a new gameCode, then set that as my state,
    const newGameId = makeRandomGameId(6);
    console.log(newGameId);

    // Create a new questions array -- This will need to be changed in the future to use the questions db table and the number of available questions there
    const questionsIndex = questionArrayGenerator(3, 4);

    // then create a new lobby using that game code,
    db.collection('games').doc(newGameId).set({
      gameStarted: false,
      questionIndex: questionsIndex,
      roundNumber: 1,
      isVotingRound: false,
      isResultsRound: false,
      host: props.user.uid,
    });

    // Then change your game code to reflect the new lobby that you made
    db.collection('users')
      .doc(props.user.uid)
      .set({ gameCode: newGameId }, { merge: true });

    // Then add yourself as a player to the lobby
    db.collection('games')
      .doc(newGameId)
      .collection('players')
      .add({ name: props.user.name, uid: props.user.uid });

    //Then update your gameCode state locally
    props.gameCodeChanged(newGameId);

    // Then redirect to the host game screen
    setRedirectTo('hostgame');
  };

  const ReconnectToGameHandler: () => void = () => {
    if (props.user.gameCode && props.user.gameCode !== 0) {
      setRedirectTo('/lobby');
    }
  };

  const redirectHandler = () => {};

  return (
    <PageContainer>
      {redirectTo.length > 0 && <Redirect push to={redirectTo} />}

      <TitleStyles>Welcome to my app!</TitleStyles>
      <ButtonContainer>
        <StartButton onClick={() => setShowGameCodeInput((curVal) => !curVal)}>
          Join Game
        </StartButton>
      </ButtonContainer>
      <AnimatePresence>
        {showGameCodeInput && (
          <GameCodeInput
            variants={{
              hidden: { opacity: 0, y: -100 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <GameCodeInputColumn>
              <input
                value={props.gameCode}
                onChange={(e) => props.gameCodeChanged(e.target.value)}
              />
              <StartButton onClick={joinNewGameHandler}>Join</StartButton>
            </GameCodeInputColumn>
            <GameCodeInputColumn>
              <StartButton onClick={ReconnectToGameHandler}>
                Reconnect To existing game
              </StartButton>
            </GameCodeInputColumn>
          </GameCodeInput>
        )}
      </AnimatePresence>

      <ButtonContainer>
        <StartButton onClick={HostGameHandler}>Host Game</StartButton>
      </ButtonContainer>
    </PageContainer>
  );
};

export default LandingPage;

export interface LandingPageProps {}
