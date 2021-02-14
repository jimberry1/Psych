import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleStyles = styled.h1`
  width: 100%;
  margin: auto;
  text-align: center;
  padding: 30px;
`;

export const GameControlButton = styled.button`
  width: 75vw;
  outline: none;
  margin: auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  height: 200px;
  align-content: center;
  align-items: center;
  width: 50%;
`;
export const GameCodeInput = styled(motion.div)`
  height: 200px;
  width: 100%;
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const GameCodeInputColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  flex: 1;
  height: 100%;
`;
