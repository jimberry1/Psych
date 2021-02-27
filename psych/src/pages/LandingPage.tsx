import {
  PageContainer,
  GameCodeInput,
  ButtonContainer,
  GameCodeInputColumn,
} from '../styles/LandingPageStyles';
import { StartButton } from '../UI/ButtonStyle1';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { PageContainerVariants } from '../styles/Animations';
import db from '../firebase';
import { Redirect } from 'react-router';
import { makeRandomGameId } from '../utilities/utilityFunctions';
import firebase from 'firebase';
import CardComponent from '../components/CardComponent';
import { faUserPlus, faLink } from '@fortawesome/free-solid-svg-icons';

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
                    photoURL: props.user?.photoURL || null,
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

    // then create a new lobby using that game code,
    db.collection('games').doc(newGameId).set({
      gameStarted: false,
      roundNumber: 1,
      isQuestionsRound: false,
      isVotingRound: false,
      isResultsRound: false,
      host: props.user.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Then change your game code on firebase to reflect the new lobby that you made
    db.collection('users')
      .doc(props.user.uid)
      .set({ gameCode: newGameId }, { merge: true });

    // Then add yourself as a player to the lobby
    db.collection('games')
      .doc(newGameId)
      .collection('players')
      .add({
        name: props.user.name,
        uid: props.user.uid,
        photoURL: props.user?.photoURL || null,
      });

    //Then update your gameCode state locally
    props.gameCodeChanged(newGameId);

    // Then redirect to the host game screen
    setRedirectTo('hostgame');
  };

  const ReconnectToGameHandler: () => void = () => {
    if (props.user.gameCode && props.user.gameCode !== 0) {
      db.collection('games')
        .doc(props.user.gameCode.toString())
        .get()
        .then((gameSnapshot: any) => {
          if (gameSnapshot.data().host === props.user.uid) {
            setRedirectTo('hostgame');
          } else {
            setRedirectTo('/lobby');
          }
        })
        .catch((err) => {
          console.log(err);
          setRedirectTo('/lobby');
        });
    }
  };

  const redirectHandler = () => {};

  return (
    <motion.div
      variants={PageContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exitting"
    >
      <PageContainer>
        {redirectTo.length > 0 && <Redirect push to={redirectTo} />}

        {/* <TitleStyles>PSYCH</TitleStyles> */}
        <ButtonContainer>
          <StartButton
            onClick={() => setShowGameCodeInput((curVal) => !curVal)}
          >
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
                <CardComponent
                  cardTitle="Join Game"
                  buttonText="Connect"
                  buttonClickedHandler={joinNewGameHandler}
                  inputPlaceholder="Enter game code..."
                  inputValue={props.gameCode}
                  inputValueChanged={(e) =>
                    props.gameCodeChanged(e.target.value)
                  }
                  icon={faUserPlus}
                  inputPresent={true}
                />
              </GameCodeInputColumn>
              <GameCodeInputColumn>
                <CardComponent
                  cardTitle="Rejoin game"
                  buttonText="Reconnect"
                  buttonClickedHandler={ReconnectToGameHandler}
                  inputValueChanged={() => {}}
                  icon={faLink}
                  inputPresent={false}
                />
              </GameCodeInputColumn>
            </GameCodeInput>
          )}
        </AnimatePresence>

        <ButtonContainer>
          <StartButton onClick={HostGameHandler}>Host Game</StartButton>
        </ButtonContainer>
        <ButtonContainer>
          <StartButton onClick={() => setRedirectTo('/submitQuestion')}>
            Add Questions
          </StartButton>
        </ButtonContainer>
      </PageContainer>
    </motion.div>
  );
};

export default LandingPage;

export interface LandingPageProps {}
