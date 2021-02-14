import styled from 'styled-components';
import LobbyCard from './LobbyCard';
import { motion } from 'framer-motion';
import { verticalFadeInVariants } from '../../styles/Animations';

const LobbyListContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LobbyCardStyle = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100px;
  width: 75%;
  color: white;
  font-family: Roboto;
  padding: 20px;
  background-color: #222;
  text-align: center;
  margin: 5px auto;
  border: 1px solid lightgray;
`;

const Lobby = (props: LobbyProps) => {
  return (
    <LobbyListContainer
      transition={{ delay: 1, staggerChildren: 0.3, when: 'beforeChildren' }}
      variants={verticalFadeInVariants}
      initial="hidden"
      animate="visible"
    >
      {props.players.map((player) => {
        return <LobbyCard key={player.id} name={player.data.name} />;
      })}
    </LobbyListContainer>
  );
};

export default Lobby;

export interface LobbyProps {
  players: any[];
}
