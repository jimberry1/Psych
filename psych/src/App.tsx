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

function App() {
  const [user, setUser] = useState(null);
  const [gameCode, setGameCode]: any = useState('');
  const [errorOrInfoText, setErrorOrInfoText] = useState('');

  let AppPage = (
    <Login
      changeUser={(value: any) => setUser(value)}
      changeGameCode={(userGameCode: string) => setGameCode(userGameCode)}
    />
  );
  if (user) {
    AppPage = (
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route path="/lobby">
            <GameLobby
              gameCode={gameCode}
              user={user}
              style={{ height: '100vh', width: '100vw' }}
            />
          </Route>
          <Route
            exact
            path="/"
            render={() => (
              <LandingPage
                gameCodeChanged={(value: any) => setGameCode(value)}
                gameCode={gameCode}
                user={user}
                handleError={(text: string) => setErrorOrInfoText(text)}
              />
            )}
          />
          <Route
            exact
            path="/hostgame"
            render={() => (
              <HostGameScreen
                gameCode={gameCode}
                user={user}
                setGameCode={setGameCode}
              />
            )}
          />
          <Route exact path="/hostgame">
            <TestPage />
          </Route>
          <Route exact path="/game">
            <GamePage gameCode={gameCode} user={user} />
          </Route>
          <Route exact path="/submitQuestion">
            <AddQuestionsPage user={user} />
          </Route>
        </Switch>
      </AnimatePresence>
    );
  }
  return <div>{AppPage}</div>;
}

export default App;