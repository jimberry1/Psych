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
export interface AddQuestionsPageProps {
  user: any;
}

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
          console.log("Sorry bro couldn't find it");
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
              <div style={{ padding: 20 }}>
                <GeneralPageTextBody>
                  Example question: 'What would XXX's superpower be?'
                </GeneralPageTextBody>
              </div>
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
              <GeneralPageTextBody>
                Enter a question collection ID to link your question with others
                from the same group of friends. If you're setting up a
                collection for the first time then click the '+' icon to
                generate a new code.
              </GeneralPageTextBody>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'flex' }}>
          <GameCodeInputBar
            placeholder="Enter collection ID..."
            style={{
              borderRadius: 10,
              border: connectedToQuestionCollection ? '7px solid green' : '',
            }}
            value={questionCollectionId}
            onChange={(e) => {
              setConnectedToQuestionCollection(false);
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
        </div>
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
