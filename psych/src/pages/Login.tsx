import db, { auth } from '../firebase';
import firebase from 'firebase';
import { useEffect, useState } from 'react';
import {
  LoginContainer,
  LoginPageContainer,
  InputBar,
  LoginTitle,
  InfoGrouping,
  SubmitButton,
  SwitchControls,
} from '../styles/loginStyles';
import PageLoader from '../components/PageLoader';

export interface LoginProps {
  changeGameCode: (newGameCode: string) => void;
  changeUser: (user: object) => void;
  displayErrorHandler: (message: string) => void;
}

const Login = ({
  changeUser,
  changeGameCode,
  displayErrorHandler,
}: LoginProps) => {
  const localStorageUid: string | null = localStorage.getItem('psy_uid');
  const [createAnAccount, setCreateAnAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (localStorageUid !== null) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          const dbUserRef = db.collection('users').doc(localStorageUid);
          dbUserRef
            .get()
            .then((docSnapshot: any) => {
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
            })
            .catch((err) => {
              console.log(err);
              setLoaded(true);
            });
        }
      });
    } else {
      setLoaded(true);
    }
  }, []);

  const signIn = (e: any) => {
    e.preventDefault();

    if (createAnAccount) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .catch((err) => {
          console.log(err);
          displayErrorHandler(err.message);
        })
        .then((result: any) => {
          if (result) {
            const dbUserRef = db.collection('users').doc(result.user.uid).set(
              {
                name: displayName,
                email: email,
                gameCode: 0,
                uid: result.user.uid,
                createdDate: firebase.firestore.FieldValue.serverTimestamp(),
                photoURL: null,
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
              photoURL: null,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          displayErrorHandler(err.message);
        });
    } else if (!createAnAccount) {
      auth
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
          console.log(err);
          displayErrorHandler(err.message);
        })
        .then((result: any) => {
          const dbUserRef = db.collection('users').doc(result.user.uid);
          dbUserRef.get().then((docSnapshot: any) => {
            if (docSnapshot.exists) {
              const userObject = {
                name: docSnapshot.data().name,
                email: docSnapshot.data().email,
                uid: result.user.uid,
                gameCode: docSnapshot.data().gameCode,
                photoURL: docSnapshot.data().photoURL,
              };

              localStorage.setItem('psy_uid', result.user.uid);
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
                photoURL: null,
              };
              dbUserRef.set(userObject);

              localStorage.setItem('psy_uid', result.user.uid);
              changeUser(userObject);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!loaded) {
    return <PageLoader />;
  }
  return (
    <LoginPageContainer>
      <LoginContainer>
        <LoginTitle>
          {createAnAccount ? 'Create an account' : 'Login'}
        </LoginTitle>

        {createAnAccount && (
          <InfoGrouping>
            <span>Enter your name</span>
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
          <SubmitButton onClick={(e) => signIn(e)}>Submit</SubmitButton>
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
  );
};

export default Login;
