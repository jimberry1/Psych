import { useState, useEffect } from 'react';
import ConfettiComponent from '../components/ConfettiComponent';
import db from '../firebase';
import { ContainerStyles, GeneralPageSubTitle } from '../styles/GeneralStyles';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeInFromLeft } from '../styles/Animations';
export interface EndOfGamePageProps {
  user: any;
  gameCode: number;
}

const WinnerContainerStyles = styled(motion.div)`
  margin-top: 10%;
  padding: 45px;
  background: #222;
  box-shadow: 4px 4px 4px 4px #505050;
  border-radius: 15px;
  word-wrap: break-word;
  word-break: break-all;

  @media (max-width: 1000px) {
    padding: 5px;
    max-width: 300px;
    box-shadow: none;
  }
`;

const EndOfGamePage: React.SFC<EndOfGamePageProps> = ({ user, gameCode }) => {
  const [gameInfo, setGameInfo]: any = useState(null);

  useEffect(() => {
    db.collection('games')
      .doc(gameCode.toString())
      .get()
      .then((gameInfo) => {
        if (gameInfo.exists) {
          setGameInfo(gameInfo.data());
        }
      });
  }, []);
  return (
    <div>
      <ConfettiComponent />
      <ContainerStyles>
        <WinnerContainerStyles
          variants={fadeInFromLeft}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          <GeneralPageSubTitle>Congratulations</GeneralPageSubTitle>
          <GeneralPageSubTitle>
            {gameInfo?.winner} has won the game!
          </GeneralPageSubTitle>
        </WinnerContainerStyles>
      </ContainerStyles>
    </div>
  );
};

export default EndOfGamePage;
