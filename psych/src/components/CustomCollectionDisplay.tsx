import { useState } from 'react';
import {
  GameControlsContainer,
  QuestionCollectionSelectionContainer,
  QuestionCollectionSelectionItem,
} from '../styles/HostGamePageStyles';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { fadeInFromLeft } from '../styles/Animations';
import { GameCodeInputBar } from '../styles/LandingPageStyles';
import {
  GeneralFlexboxColumnDirection,
  GeneralPageTextBody,
} from '../styles/GeneralStyles';
import { faInfoCircle, fas, faSearch } from '@fortawesome/free-solid-svg-icons';

export interface CustomQuestionDisplayProps {
  searchForQuestionCollectionById: (questionCollectionId: string) => void;
  handleInfoButton: (infoText: string) => void;
  numberOfCustomQuestions: number;
  parentQuestionCollectionId: string;
}

type gameMode = { gameModeDisplayName: string; gameModeCode: number };

const CustomQuestionDisplay: React.SFC<CustomQuestionDisplayProps> = ({
  searchForQuestionCollectionById,
  handleInfoButton,
  numberOfCustomQuestions,
  parentQuestionCollectionId,
}) => {
  const [selectedQuestionSet, setSelectedQuestionSet] = useState(0);
  const [questionCollectionId, setQuestionCollectionId] = useState('');

  const questionCollectionModes = [
    { gameModeDisplayName: 'Standard Questions', gameModeCode: 0 },
    { gameModeDisplayName: 'Custom Questions', gameModeCode: 1 },
    { gameModeDisplayName: 'Mixed', gameModeCode: 2 },
  ];

  return (
    <div>
      <GameControlsContainer>
        {questionCollectionModes.map((questionMode: gameMode) => {
          return (
            <QuestionCollectionSelectionContainer
              key={`${questionMode.gameModeDisplayName}-${questionMode.gameModeDisplayName}`}
              onClick={() => setSelectedQuestionSet(questionMode.gameModeCode)}
            >
              <QuestionCollectionSelectionItem>
                {questionMode.gameModeDisplayName}
              </QuestionCollectionSelectionItem>
              <QuestionCollectionSelectionItem>
                <FontAwesomeIcon
                  icon={faCheckSquare}
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
        <AnimatePresence>
          {(selectedQuestionSet === 1 || selectedQuestionSet === 2) && (
            <motion.div
              key="AnimatePresenceInputCodeBox001"
              variants={fadeInFromLeft}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <GeneralFlexboxColumnDirection>
                <div style={{ display: 'flex', padding: '0px 10px' }}>
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
                <div style={{ display: 'flex' }}>
                  <GameCodeInputBar
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
            </motion.div>
          )}
          {parentQuestionCollectionId && (
            <motion.div
              variants={fadeInFromLeft}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key="AnimatePresenceResponseMessage001"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
            >{`Successfully connected to question collection ID ${parentQuestionCollectionId}`}</motion.div>
          )}
        </AnimatePresence>
      </GameControlsContainer>
    </div>
  );
};

export default CustomQuestionDisplay;
