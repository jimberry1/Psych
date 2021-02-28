import { useState } from 'react';
import { GameCodeInputBar, StyledTextArea } from '../styles/LandingPageStyles';
import db from '../firebase';
import {
  ContainerStyles,
  GeneralBlueButtonStyles,
  GeneralPageSubTitle,
  GeneralPageTextBody,
} from '../styles/GeneralStyles';
import firebase from 'firebase';
import { AnimatePresence, motion } from 'framer-motion';
import {
  fadeInFromLeft,
  PageContainerVariants,
  verticalFadeInVariants,
} from '../styles/Animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { makeRandomGameId } from '../utilities/utilityFunctions';
import styled from 'styled-components';
export interface AddQuestionsPageProps {
  user: any;
}

const GameInputContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;

const AddQuestionsPage: React.SFC<AddQuestionsPageProps> = ({ user }) => {
  const [question, setQuestion] = useState('');
  const [questionCollectionId, setQuestionCollectionId] = useState('');
  const [lockedQuestionCollectionId, setLockedQuestionCollectionId] = useState(
    ''
  );
  const [hasSubmittedQuestion, setHasSubmittedQuestion] = useState(false);
  const [
    connectedToQuestionCollection,
    setConnectedToQuestionCollection,
  ] = useState(false);
  const [error, setError] = useState('');

  const submitQuestionHandler = () => {
    if (!questionCollectionId) {
      setError(
        'Please connect to a question collection before submitting a question'
      );
      return;
    }
    if (question.length > 10) {
      db.collection('customQuestions')
        .doc(questionCollectionId)
        .collection('questions')
        .doc('Indexor')
        .get()
        .then((indexor) => {
          if (indexor.exists) {
            const index = indexor.get('index');

            db.collection('customQuestions')
              .doc(lockedQuestionCollectionId)
              .collection('questions')
              .add({
                question: question,
                index: index,
                uid: user.uid,
                name: user.name,
              });

            db.collection('customQuestions')
              .doc(questionCollectionId)
              .collection('questions')
              .doc('Indexor')
              .update({ index: firebase.firestore.FieldValue.increment(1) });

            setQuestion('');
            setHasSubmittedQuestion(true);
          } else {
            setError(
              `Could not find a question collection for ID '${questionCollectionId}'`
            );
          }
        });
    } else {
      setError('Please make sure your question is over 10 characters long');
    }
  };

  const connectToQuestionCollection = () => {
    if (!questionCollectionId) {
      console.log('lol nothing is even here');
      return;
    }
    db.collection('customQuestions')
      .doc(questionCollectionId)
      .collection('questions')
      .doc('Indexor')
      .get()
      .then((indexor) => {
        if (indexor.exists) {
          setConnectedToQuestionCollection(true);
          setLockedQuestionCollectionId(questionCollectionId);
        } else {
          setError(`No collection ID matching '${questionCollectionId}' found`);
        }
      });
  };

  const generateQuestionID = () => {
    console.log('generate question ID handler invoked');
    const questionCollectionId = makeRandomGameId(6);
    console.log(questionCollectionId);
    db.collection('customQuestions')
      .doc(questionCollectionId)
      .collection('questions')
      .doc('Indexor')
      .set({ index: 0 })
      .then(() => {
        setQuestionCollectionId(questionCollectionId);
      })
      .catch((err) => setError(err.message));
  };
  return (
    <motion.div
      variants={PageContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exitting"
    >
      <ContainerStyles>
        <GeneralPageSubTitle>Contribute your questions!</GeneralPageSubTitle>
        <AnimatePresence exitBeforeEnter>
          {connectedToQuestionCollection ? (
            <motion.div
              variants={verticalFadeInVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key="AnimatePresenceStep1Key"
              style={{ maxWidth: '80%', gap: 20 }}
            >
              <GeneralPageSubTitle>Step 2</GeneralPageSubTitle>
              <GeneralPageTextBody>
                To contribute a question simply enter it in the box below. If
                the letters XXX are included in your question they will be
                substituted for a randomly selected name of a player in your
                game.
              </GeneralPageTextBody>
              <GeneralPageTextBody style={{ padding: 20, marginTop: 10 }}>
                Example question: 'Why did XXX cross the road?'
              </GeneralPageTextBody>
            </motion.div>
          ) : (
            <motion.div
              variants={verticalFadeInVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key="AnimatePresenceStep2Key"
              style={{ maxWidth: '80%' }}
            >
              <GeneralPageSubTitle>Step 1</GeneralPageSubTitle>
              <GeneralPageTextBody style={{ padding: 20 }}>
                Enter a question collection ID to link your question with others
                from the same group of friends. If you're setting up a
                collection for the first time then click the '+' icon to
                generate a new code.
              </GeneralPageTextBody>
            </motion.div>
          )}
        </AnimatePresence>

        <GameInputContainer>
          <GameCodeInputBar
            placeholder="Enter collection ID..."
            style={{
              borderRadius: 10,
              border: connectedToQuestionCollection ? '7px solid green' : '',
            }}
            value={questionCollectionId}
            onChange={(e) => {
              setConnectedToQuestionCollection(false);
              setError('');
              setQuestionCollectionId(e.target.value);
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FontAwesomeIcon
              icon={faInfoCircle}
              style={{ fontSize: 20, padding: 10 }}
              onClick={() =>
                setError(
                  `The Question collection ID links questions submitted by multiple people into a single collection for a shared game. If you don't have a code yet then hit '+' to
                   generate a new collection ID and share the code with your friends`
                )
              }
            />
            <FontAwesomeIcon
              icon={faPlus}
              style={{ fontSize: 20, padding: 10 }}
              onClick={generateQuestionID}
            />
          </div>
        </GameInputContainer>
        {connectedToQuestionCollection ? (
          <div></div>
        ) : (
          <GeneralBlueButtonStyles onClick={connectToQuestionCollection}>
            Connect
          </GeneralBlueButtonStyles>
        )}
        <AnimatePresence>
          {hasSubmittedQuestion && (
            <motion.div
              variants={{
                hidden: { opacity: 0, x: '-100vw' },
                visible: { opacity: 1, x: 0 },
                exitted: { opacity: 0, x: '100vw' },
              }}
              initial="hidden"
              animate="visible"
              exit="exitted"
            >
              <p style={{ padding: 20 }}>
                Thanks for submitting your question!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {error.length > 0 && (
            <motion.div
              variants={{
                hidden: { opacity: 0, x: '-100vw' },
                visible: { opacity: 1, x: 0 },
                exitted: { opacity: 0, x: '100vw' },
              }}
              initial="hidden"
              animate="visible"
              exit="exitted"
            >
              <p style={{ padding: 20 }}>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        {connectedToQuestionCollection && (
          <motion.div
            style={{
              padding: 15,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            variants={fadeInFromLeft}
            initial="hidden"
            animate="visible"
          >
            <StyledTextArea
              placeholder="Enter question here..."
              style={{ width: '80%', padding: 15, height: '200px' }}
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                setHasSubmittedQuestion(false);
                setError('');
              }}
            />

            <GeneralBlueButtonStyles onClick={submitQuestionHandler}>
              Submit
            </GeneralBlueButtonStyles>
          </motion.div>
        )}
      </ContainerStyles>
    </motion.div>
  );
};

export default AddQuestionsPage;
