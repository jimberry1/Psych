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
import { PageContainerVariants } from '../styles/Animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { makeRandomGameId } from '../utilities/utilityFunctions';
export interface AddQuestionsPageProps {
  user: any;
}

const AddQuestionsPage: React.SFC<AddQuestionsPageProps> = ({ user }) => {
  const [question, setQuestion] = useState('');
  const [questionCollectionId, setQuestionCollectionId] = useState('');
  const [hasSubmittedQuestion, setHasSubmittedQuestion] = useState(false);
  const [error, setError] = useState('');

  const submitQuestionHandler = () => {
    if (
      question.length > 10 &&
      (question.search('xxx') !== -1 || question.search('XXX') !== -1)
    ) {
      db.collection('customQuestions')
        .doc(questionCollectionId)
        .collection('questions')
        .doc('Indexor')
        .get()
        .then((indexor) => {
          if (indexor.exists) {
            const index = indexor.get('index');

            db.collection('customQuestions')
              .doc(questionCollectionId)
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

      //   db.collection('questions')
      //     .doc('Indexor')
      //     .get()
      //     .then((Indexor) => {
      //       const index = Indexor.get('index');

      //       db.collection('questions').add({
      //         question: question,
      //         index: index,
      //         uid: user.uid,
      //         name: user.name,
      //       });

      //       db.collection('questions')
      //         .doc('Indexor')
      //         .update({ index: firebase.firestore.FieldValue.increment(1) });

      //       setQuestion('');
      //       setHasSubmittedQuestion(true);
      //     });
    } else {
      setError(
        'Please make sure your question is over 10 characters long and contains XXX'
      );
    }
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
        <div style={{ padding: 20 }}>
          <GeneralPageTextBody>
            To contribute a question simply enter it in the box below and type
            XXX where the name of a random player will be substituted
          </GeneralPageTextBody>
        </div>
        <div style={{ padding: 20 }}>
          <GeneralPageTextBody>
            Example question: 'What would XXX's superpower be?'
          </GeneralPageTextBody>
        </div>
        {/* <div>
          <GeneralPageTextBody>
            Make sure your questions are linked to a question pool using a
            question collection identifier!
          </GeneralPageTextBody>
        </div> */}
        <div style={{ display: 'flex' }}>
          <GameCodeInputBar
            placeholder="Enter collection ID..."
            style={{ borderRadius: 10 }}
            value={questionCollectionId}
            onChange={(e) => setQuestionCollectionId(e.target.value)}
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

        <StyledTextArea
          placeholder="Enter question here..."
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
      </ContainerStyles>
    </motion.div>
  );
};

export default AddQuestionsPage;
