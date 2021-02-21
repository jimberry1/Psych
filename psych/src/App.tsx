import logo from './logo.svg';
import { useState, useEffect } from 'react';
import db from './firebase';
import './App.css';
import Login from './pages/Login';
import { Switch, Route } from 'react-router';
import LandingPage from './pages/LandingPage';
import GameLobby from './pages/GameLobby';
import HostGameScreen from './pages/HostGameScreen';
import GamePage from './pages/GamePage';
import { AnimatePresence } from 'framer-motion';
import TestPage from './pages/TestPage';
import AddQuestionsPage from './pages/AddQuestionsPage';
import Header from './UI/Navbar/Header';
import { relative } from 'path';
import Modal from './UI/Modal/Modal';

function App() {
  const [user, setUser] = useState(null);
  const [gameCode, setGameCode]: any = useState('');
  const [errorOrInfoText, setErrorOrInfoText] = useState('');
  const [modalTitleText, setModalTitleText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const HandleNewErrorOrInfo = (message: string) => {
    setErrorOrInfoText(message);
    setShowModal(true);
  };

  let AppPage = (
    <Login
      changeUser={(value: any) => setUser(value)}
      changeGameCode={(userGameCode: string) => setGameCode(userGameCode)}
      displayErrorHandler={(message: string) => HandleNewErrorOrInfo(message)}
    />
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
                  setErrorOrInfoText(text);
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
            />
          </Route>
          <Route exact path="/test">
            <TestPage />
          </Route>
          <Route exact path="/game" key="GamePageKey">
            <GamePage gameCode={gameCode} user={user} />
          </Route>
          <Route exact path="/submitQuestion">
            <AddQuestionsPage user={user} key="AddQuestionsKey" />
          </Route>
        </Switch>
      </AnimatePresence>
    );
  }
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        overflowX: 'hidden',
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
            setErrorOrInfoText(`The Game Code is: ${gameCode}`);
            setShowModal(true);
          }}
        />
      </div>
      <div style={{ position: 'relative' }}>{AppPage}</div>
    </div>
  );
}

export default App;
