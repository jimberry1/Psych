import { useState } from 'react';
import {
  GameControlsContainer,
  QuestionCollectionSelectionContainer,
  QuestionCollectionSelectionItem,
} from '../styles/HostGamePageStyles';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { fadeInFromLeft } from '../styles/Animations';
import { SkinnyGameCodeInputBar } from '../styles/LandingPageStyles';
import {
  GeneralFlexboxColumnDirection,
  GeneralPageTextBody,
} from '../styles/GeneralStyles';
import {
  faInfoCircle,
  faSearch,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import SpinningBlueTick from './SpinningBlueTick';
import styled from 'styled-components';

const MotionisedContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10;
  text-align: center;
`;

export interface CustomQuestionDisplayProps {
  searchForQuestionCollectionById: (questionCollectionId: string) => void;
  setSelectedQuestionSet: (gameModeCode: number) => void;
  handleInfoButton: (infoText: string) => void;
  numberOfCustomQuestions: number;
  parentQuestionCollectionId: string;
  selectedQuestionSet: number;
}

type gameMode = { gameModeDisplayName: string; gameModeCode: number };

const CustomQuestionDisplay: React.SFC<CustomQuestionDisplayProps> = ({
  searchForQuestionCollectionById,
  handleInfoButton,
  parentQuestionCollectionId,
  selectedQuestionSet,
  setSelectedQuestionSet,
}) => {
  const [questionCollectionId, setQuestionCollectionId] = useState('');

  const questionCollectionModes = [
    { gameModeDisplayName: 'Standard Questions', gameModeCode: 0 },
    { gameModeDisplayName: 'Custom Questions', gameModeCode: 1 },
    // { gameModeDisplayName: 'Mixed', gameModeCode: 2 },
  ];

  return (
    <div>
      <GameControlsContainer>
        {questionCollectionModes.map((questionMode: gameMode) => {
          return (
            <QuestionCollectionSelectionContainer
              key={`${questionMode.gameModeDisplayName}-${questionMode.gameModeDisplayName}`}
              onClick={() => {
                setSelectedQuestionSet(questionMode.gameModeCode);
                if (questionMode.gameModeCode === 0) {
                  setQuestionCollectionId('');
                }
              }}
            >
              <QuestionCollectionSelectionItem>
                {questionMode.gameModeDisplayName}
              </QuestionCollectionSelectionItem>
              <QuestionCollectionSelectionItem>
                <FontAwesomeIcon
                  icon={
                    selectedQuestionSet === questionMode.gameModeCode
                      ? faCheckSquare
                      : faSquare
                  }
                  size="2x"
                  color={
                    selectedQuestionSet === questionMode.gameModeCode
                      ? '#11FF00'
                      : 'white'
                  }
                />
              </QuestionCollectionSelectionItem>
            </QuestionCollectionSelectionContainer>
          );
        })}
        <AnimatePresence exitBeforeEnter>
          {(selectedQuestionSet === 1 || selectedQuestionSet === 2) &&
            !parentQuestionCollectionId && (
              <MotionisedContainer
                key="AnimatePresenceInputCodeBox001"
                variants={fadeInFromLeft}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <GeneralFlexboxColumnDirection>
                  <div
                    style={{
                      display: 'flex',
                      padding: '0px 10px',
                    }}
                  >
                    <GeneralPageTextBody>
                      Enter Question ID collection
                    </GeneralPageTextBody>
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      style={{ fontSize: 20, padding: 5 }}
                      onClick={() =>
                        handleInfoButton(
                          `The Question collection ID links questions submitted by multiple people into a single collection for a shared game. 
                        If you don't have a code yet then navigate to the Submit Questions page and generate one!`
                        )
                      }
                    />
                  </div>
                  <div style={{ display: 'flex', maxWidth: '80%' }}>
                    <SkinnyGameCodeInputBar
                      placeholder="Enter ID..."
                      value={questionCollectionId}
                      onChange={(e) => setQuestionCollectionId(e.target.value)}
                    />
                    <div
                      style={{ margin: 'auto' }}
                      onClick={() =>
                        searchForQuestionCollectionById(questionCollectionId)
                      }
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        size="2x"
                        flip="horizontal"
                        style={{ marginLeft: 10 }}
                      />
                    </div>
                  </div>
                </GeneralFlexboxColumnDirection>
              </MotionisedContainer>
            )}
          {parentQuestionCollectionId && (
            <MotionisedContainer
              variants={fadeInFromLeft}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key="AnimatePresenceResponseMessage001"
              style={{
                flexDirection: 'column',
              }}
            >
              <SpinningBlueTick />
              {`Successfully connected to question collection ID ${parentQuestionCollectionId}`}
            </MotionisedContainer>
          )}
        </AnimatePresence>
        {!parentQuestionCollectionId && selectedQuestionSet > 0 && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              textAlign: 'center',
            }}
          >
            Not yet connected to questions collection
          </div>
        )}
      </GameControlsContainer>
    </div>
  );
};

export default CustomQuestionDisplay;
