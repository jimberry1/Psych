import db, { auth } from '../firebase';
import firebase from 'firebase';
import { useState } from 'react';
import {
  LoginContainer,
  LoginPageContainer,
  InputBar,
  LoginTitle,
  InfoGrouping,
  SubmitButton,
  SwitchControls,
} from '../styles/loginStyles';
import { resultingClientExists } from 'workbox-core/_private';
import { motion } from 'framer-motion';
import { PageContainerVariants } from '../styles/Animations';

export interface LoginProps {
  changeGameCode: (newGameCode: string) => void;
  changeUser: (user: object) => void;
}

const Login = ({ changeUser, changeGameCode }: LoginProps) => {
  const localStorageUid: string | null = localStorage.getItem('psy_uid');
  const [createAnAccount, setCreateAnAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');

  if (localStorageUid !== null) {
    console.log('id found');
    auth.onAuthStateChanged(function (user) {
      if (user) {
        const dbUserRef = db.collection('users').doc(localStorageUid);
        dbUserRef.get().then((docSnapshot: any) => {
          if (docSnapshot.exists) {
            const userObj = {
              name: docSnapshot.data().name,
              email: docSnapshot.data().email,
              photoURL: docSnapshot.data().photoURL,
              uid: docSnapshot.data().uid,
              gameCode: docSnapshot.data().gameCode,
            };
            changeGameCode(docSnapshot.data().gameCode);
            changeUser(userObj);
          }
        });
      }
    });
  }

  const signIn = (e: any) => {
    e.preventDefault();

    console.log('signing in...');

    if (createAnAccount) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .catch((err) => console.log(err))
        .then((result: any) => {
          console.log('creating user with email and password');
          if (result) {
            console.log('This is the result ' + result);
            console.log(result);
            const dbUserRef = db.collection('users').doc(result.user.uid).set(
              {
                name: displayName,
                email: email,
                gameCode: 0,
                uid: result.user.uid,
                createdDate: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );

            localStorage.setItem('psy_uid', result.user.uid);

            changeUser({
              name: displayName,
              email: email,
              gameCode: 0,
              uid: result.user.uid,
              createdDate: firebase.firestore.FieldValue.serverTimestamp(),
            });
          }
        })
        .catch((err) => console.log(err));
    } else if (!createAnAccount) {
      console.log('attempting to sign in');
      auth
        .signInWithEmailAndPassword(email, password)
        .catch((err) => console.log(err))
        .then((result: any) => {
          const dbUserRef = db.collection('users').doc(result.user.uid);
          console.log('in here');
          dbUserRef.get().then((docSnapshot: any) => {
            if (docSnapshot.exists) {
              console.log('This user already exists');
              const userObject = {
                name: docSnapshot.data().name,
                email: docSnapshot.data().email,
                uid: result.user.uid,
                gameCode: docSnapshot.data().gameCode,
              };

              localStorage.setItem('psy_uid', result.user.uid);
              changeGameCode(docSnapshot.data().gameCode);
              changeUser(userObject);
            } else {
              console.log(
                "This is the weird case where the user is signing in but actually they don't exist in the user database table"
              );
              const userObject = {
                name: displayName,
                email: email,
                gameCode: 0,
                uid: result.user.uid,
                createdDate: firebase.firestore.FieldValue.serverTimestamp(),
              };
              dbUserRef.set(userObject);

              localStorage.setItem('psy_uid', result.user.uid);
              changeUser(userObject);
            }
          });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <motion.div
      variants={PageContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <LoginPageContainer>
        <LoginContainer>
          <LoginTitle>
            {createAnAccount ? 'Create an account' : 'Login'}
          </LoginTitle>

          {createAnAccount && (
            <InfoGrouping>
              <span>Enter your username</span>
              <InputBar
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
              ></InputBar>
            </InfoGrouping>
          )}
          <InfoGrouping>
            <span>Enter your Email</span>
            <InputBar
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></InputBar>
          </InfoGrouping>
          <InfoGrouping>
            <span>Enter your password</span>
            <InputBar
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></InputBar>
          </InfoGrouping>

          <InfoGrouping>
            <SubmitButton
              onClick={(e) => signIn(e)}
              // disabled={
              //   !(
              //     email.length > 0 &&
              //     password.length > 6 &&
              //     (createAnAccount ? displayName.length > 2 : true)
              //   )
              // }
            >
              Submit
            </SubmitButton>
          </InfoGrouping>
          <InfoGrouping>
            <SwitchControls
              onClick={() => setCreateAnAccount((curVal) => !curVal)}
            >
              {createAnAccount
                ? 'Switch to Sign in'
                : 'Switch to account creation'}
            </SwitchControls>
          </InfoGrouping>
        </LoginContainer>
      </LoginPageContainer>
    </motion.div>
  );
};

export default Login;
