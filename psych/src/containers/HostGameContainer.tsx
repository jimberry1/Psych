import db from '../firebase';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { verticalFadeInVariants } from '../styles/Animations';

const GameCodeContainer = styled(motion.div)`
  height: 25vh;
  width: 75vw;
  font-size: 2em;
  margin: auto;
  text-align: center;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const HostGameContainer = (props: any) => {
  return (
    <GameCodeContainer
      variants={verticalFadeInVariants}
      transition={{ staggerChildren: 0.2 }}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={verticalFadeInVariants}>The Game Code is:</motion.h2>
      <motion.h2 variants={verticalFadeInVariants}>{props.lobbyCode}</motion.h2>
    </GameCodeContainer>
  );
};

export default HostGameContainer;

export interface HostGameContainerProps {}
