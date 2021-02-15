import db from '../firebase';
import { useState, useEffect } from 'react';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import Lobby from '../components/Lobby/Lobby';
import { Redirect } from 'react-router';
import { GameLobbyHeader } from '../styles/GameLobby';
import { fadeInFromLeft, PageContainerVariants } from '../styles/Animations';
import ThreeDotLoader from '../UI/ThreeDotLoader';

const GameLobby = (props: any) => {
  const [players, setPlayers]: any = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (props.gameCode) {
      const playerDbRef = db
        .collection('games')
        .doc(props.gameCode.toString())
        .collection('players');

      console.log(playerDbRef);

      playerDbRef.onSnapshot((docSnapshot) => {
        setPlayers(
          docSnapshot.docs.map((doc: any) => ({ id: doc.id, data: doc.data() }))
        );
        console.log(
          docSnapshot.docs.map((doc: any) => ({ id: doc.id, data: doc.data() }))
        );
      });
    }
  }, []);

  useEffect(() => {
    db.collection('games')
      .doc(props.gameCode.toString())
      .onSnapshot((querySnap: any) => {
        if (querySnap.exists) {
          setGameStarted(querySnap.data().gameStarted);
        }
      });
  }, []);

  return (
    <motion.div
      variants={PageContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exitting"
    >
      {gameStarted && <Redirect push to="/game" />}
      <motion.div
        variants={fadeInFromLeft}
        transition={{ when: 'beforeChildren', duration: 1 }}
        initial="hidden"
        animate="visible"
      >
        <GameLobbyHeader>
          <h2>Game Lobby</h2>
          <h2>{props.gameCode}</h2>
        </GameLobbyHeader>
        {players[0] && <Lobby players={players} />}
        <div
          style={{
            margin: 'auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}
        >
          <span>Waiting for players to join</span>
          <ThreeDotLoader />
        </div>
      </motion.div>
      <button onClick={() => setGameStarted(true)}>test</button>
    </motion.div>
  );
};

export default GameLobby;

export interface GameLobbyProps {}
