import styled from 'styled-components';
import { motion } from 'framer-motion';
import db from '../firebase';
import { keyframes } from 'styled-components';
import {
  GeneralBlueButtonStyles,
  ContainerStyles,
  GeneralPageSubTitle,
} from '../styles/GeneralStyles';
import { StyledTextArea } from '../styles/LandingPageStyles';
import CountDownClock from './CountDownClock';
export interface QuestionComponentProps {
  question: string;
  answer: string;
  gameCode: string | number;
  answerChangedHandler: (answer: string) => void;
  submitAnswerHandler: () => void;
  roundDurationTimer: number;
  roundTimerRunsOutOfTimeHandler: () => void;
}

const QuestionComponent: React.SFC<QuestionComponentProps> = ({
  question,
  answer,
  gameCode,
  answerChangedHandler,
  submitAnswerHandler,
  roundDurationTimer,
  roundTimerRunsOutOfTimeHandler,
}) => {
  return (
    <motion.div>
      <ContainerStyles>
        {roundDurationTimer > 0 && (
          <CountDownClock
            duration={roundDurationTimer * 60}
            countDownComplete={roundTimerRunsOutOfTimeHandler}
          />
        )}
        <GeneralPageSubTitle style={{ marginBottom: 50, padding: 20 }}>
          {question}
        </GeneralPageSubTitle>
        <StyledTextArea
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
          onChange={(e) => {
            if (e.target.value.length < 250) {
              answerChangedHandler(e.target.value);
            }
          }}
        />
        <GeneralBlueButtonStyles onClick={submitAnswerHandler}>
          Submit
        </GeneralBlueButtonStyles>
      </ContainerStyles>
    </motion.div>
  );
};

export default QuestionComponent;
