import styled from 'styled-components';
import { motion } from 'framer-motion';
import db from '../firebase';
import { keyframes } from 'styled-components';
import {
  GeneralBlueButtonStyles,
  ContainerStyles,
} from '../styles/GeneralStyles';
export interface QuestionComponentProps {
  question: string;
  answer: string;
  gameCode: string | number;
  answerChangedHandler: (answer: string) => void;
  submitAnswerHandler: () => void;
}

const QuestionComponent: React.SFC<QuestionComponentProps> = ({
  question,
  answer,
  gameCode,
  answerChangedHandler,
  submitAnswerHandler,
}) => {
  return (
    <motion.div>
      <ContainerStyles>
        <h1 style={{ marginBottom: 50 }}>{question}</h1>
        <input
          style={{
            marginBottom: 50,
            minWidth: 200,
            minHeight: 150,
            textAlign: 'center',
            padding: 30,
            whiteSpace: 'pre-line',
            outline: 'none',
          }}
          value={answer}
          onChange={(e) => answerChangedHandler(e.target.value)}
        />
        <GeneralBlueButtonStyles onClick={submitAnswerHandler}>
          Submit
        </GeneralBlueButtonStyles>
      </ContainerStyles>
    </motion.div>
  );
};

export default QuestionComponent;
