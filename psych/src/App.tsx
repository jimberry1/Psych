import { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import { Switch, Route, Redirect } from 'react-router';
import LandingPage from './pages/LandingPage';
import GameLobby from './pages/GameLobby';
import HostGameScreen from './pages/HostGameScreen';
import GamePage from './pages/GamePage';
import { AnimatePresence } from 'framer-motion';
import TestPage from './pages/TestPage';
import AddQuestionsPage from './pages/AddQuestionsPage';
import Header from './UI/Navbar/Header';
import Modal from './UI/Modal/Modal';
import EndOfGamePage from './pages/EndOfGamePage';
import StartPage from './pages/StartPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function App() {
  const location = useLocation();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [gameCode, setGameCode]: any = useState('');
  const [errorOrInfoText, setErrorOrInfoText] = useState('');
  const [modalTitleText, setModalTitleText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [preAuthLocation, setPreAuthLocation] = useState(location.pathname);

  const HandleNewErrorOrInfo = (message: string) => {
    setErrorOrInfoText(message);
    setShowModal(true);
  };

  // Tracks the route of the user and stores it in state
  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/signin') {
      setPreAuthLocation(location.pathname);
    }
  }, [location]);

  // Pushes the user to their pre-authenticated route after a rerender cycle
  useEffect(() => {
    if (user !== null) {
      history.push(preAuthLocation);
    }
  }, [user]);

  let AppPage = (
    <Switch>
      <Route exact path="/signin">
        <Login
          changeUser={(value: any) => setUser(value)}
          changeGameCode={(userGameCode: string) => setGameCode(userGameCode)}
          displayErrorHandler={(message: string) =>
            HandleNewErrorOrInfo(message)
          }
        />
      </Route>
      <Route path="/">
        <StartPage key="startPageKey" />
      </Route>
    </Switch>
  );
  if (user) {
    AppPage = (
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route path="/lobby" key="GameLobbyKey">
            <GameLobby
              gameCode={gameCode}
              user={user}
              style={{ height: '100vh', width: '100vw' }}
            />
          </Route>

          <Route
            exact
            path="/"
            key="LandingPageKey"
            render={() => (
              <LandingPage
                gameCodeChanged={(value: any) => setGameCode(value)}
                gameCode={gameCode}
                user={user}
                handleError={(text: string) => {
                  HandleNewErrorOrInfo(text);
                  setModalTitleText('Attention');
                }}
              />
            )}
          />
          <Route exact path="/hostgame" key="HostGameScreenKey">
            <HostGameScreen
              gameCode={gameCode}
              user={user}
              setGameCode={setGameCode}
              handleError={(text: string) => {
                console.log(text);
                HandleNewErrorOrInfo(text);
                setModalTitleText('Information');
              }}
            />
          </Route>
          <Route exact path="/test">
            <TestPage user={user} />
          </Route>
          <Route exact path="/game" key="GamePageKey">
            <GamePage gameCode={gameCode} user={user} />
          </Route>
          <Route exact path="/submitQuestion">
            <AddQuestionsPage user={user} key="AddQuestionsKey" />
          </Route>

          <Route exact path="/EndOfGame">
            <EndOfGamePage
              user={user}
              gameCode={gameCode}
              key="EndOfGamePage"
            />
          </Route>
          <Route exact path="/privacyPolicy">
            <PrivacyPolicyPage key="PrivacyPolicyPage" />
          </Route>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </AnimatePresence>
    );
  }
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        overflowY: 'scroll',
        // scrollBehavior: 'smooth',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Modal
          toggled={showModal}
          setToggled={() => {
            setShowModal((curVal) => !curVal);
            setErrorOrInfoText('');
          }}
          title={modalTitleText}
          message={errorOrInfoText}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header
          logout={() => setUser(null)}
          isAuthenticated={user !== null}
          infoButtonClicked={() => {
            setModalTitleText('INFO');
            setErrorOrInfoText(`Current game code: ${gameCode}`);
            setShowModal(true);
          }}
        />
      </div>
      <div style={{ position: 'relative' }}>{AppPage}</div>
    </div>
  );
}

export default App;
