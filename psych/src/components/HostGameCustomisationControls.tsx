import {
  GameControlsContainer,
  GameControlsInnerBox,
  GameControlsOptionsContainer,
  GameControlsInnerBoxTitle,
  GameControlsInnerBoxContent,
} from '../styles/HostGamePageStyles';

export interface HostGameCustomisationControlsProps {
  roundNumberSelected: number;
  setRoundNumberSelected: (roundNumber: number) => void;
  timeLimitSelected: number;
  setTimeLimitSelected: (timeLimit: number) => void;
  playerNumberAutoprogressThreshold: number;
  setPlayerNumberAutoprogressThreshold: (numberOfPlayers: number) => void;
}

const HostGameCustomisationControls: React.SFC<HostGameCustomisationControlsProps> = ({
  roundNumberSelected,
  setRoundNumberSelected,
  timeLimitSelected,
  setTimeLimitSelected,
  playerNumberAutoprogressThreshold,
  setPlayerNumberAutoprogressThreshold,
}) => {
  return (
    <GameControlsContainer>
      <GameControlsInnerBox>
        <GameControlsInnerBoxTitle>Number of Rounds</GameControlsInnerBoxTitle>
        <GameControlsOptionsContainer>
          <GameControlsInnerBoxContent
            style={{
              border: roundNumberSelected === 5 ? '1px solid green' : 'none',
            }}
            onClick={() => setRoundNumberSelected(5)}
          >
            5
          </GameControlsInnerBoxContent>
          <GameControlsInnerBoxContent
            style={{
              border: roundNumberSelected === 7 ? '1px solid green' : 'none',
            }}
            onClick={() => setRoundNumberSelected(7)}
          >
            7
          </GameControlsInnerBoxContent>
          <GameControlsInnerBoxContent
            style={{
              border: roundNumberSelected === 10 ? '1px solid green' : 'none',
            }}
            onClick={() => setRoundNumberSelected(10)}
          >
            10
          </GameControlsInnerBoxContent>
          <GameControlsInnerBoxContent
            style={{
              border: roundNumberSelected === 15 ? '1px solid green' : 'none',
            }}
            onClick={() => setRoundNumberSelected(15)}
          >
            15
          </GameControlsInnerBoxContent>
        </GameControlsOptionsContainer>
      </GameControlsInnerBox>
      <GameControlsInnerBox>
        <GameControlsInnerBoxTitle>
          Question time limit (mins)
        </GameControlsInnerBoxTitle>
        <GameControlsOptionsContainer>
          <GameControlsInnerBoxContent
            style={{
              border: timeLimitSelected === 1 ? '1px solid green' : 'none',
            }}
            onClick={() => setTimeLimitSelected(1)}
          >
            1
          </GameControlsInnerBoxContent>
          <GameControlsInnerBoxContent
            style={{
              border: timeLimitSelected === 2 ? '1px solid green' : 'none',
            }}
            onClick={() => setTimeLimitSelected(2)}
          >
            2
          </GameControlsInnerBoxContent>
          <GameControlsInnerBoxContent
            style={{
              border: timeLimitSelected === 5 ? '1px solid green' : 'none',
            }}
            onClick={() => setTimeLimitSelected(5)}
          >
            5
          </GameControlsInnerBoxContent>
          <GameControlsInnerBoxContent
            style={{
              border: timeLimitSelected === -1 ? '1px solid green' : 'none',
            }}
            onClick={() => setTimeLimitSelected(-1)}
          >
            None
          </GameControlsInnerBoxContent>
        </GameControlsOptionsContainer>
      </GameControlsInnerBox>
      {/* <GameControlsInnerBox>
        <GameControlsInnerBoxTitle>
          Autoprogress threshold
        </GameControlsInnerBoxTitle>
        <GameControlsOptionsContainer>
          <GameControlsInnerBoxContent
            style={{
              border:
                playerNumberAutoprogressThreshold === 1
                  ? '1px solid green'
                  : 'none',
            }}
            onClick={() => setPlayerNumberAutoprogressThreshold(1)}
          >
            1
          </GameControlsInnerBoxContent>
          <GameControlsInnerBoxContent
            style={{
              border:
                playerNumberAutoprogressThreshold === 2
                  ? '1px solid green'
                  : 'none',
            }}
            onClick={() => setPlayerNumberAutoprogressThreshold(2)}
          >
            2
          </GameControlsInnerBoxContent>
          <GameControlsInnerBoxContent
            style={{
              border:
                playerNumberAutoprogressThreshold === -1
                  ? '1px solid green'
                  : 'none',
            }}
            onClick={() => setPlayerNumberAutoprogressThreshold(-1)}
          >
            None
          </GameControlsInnerBoxContent>
        </GameControlsOptionsContainer>
      </GameControlsInnerBox> */}
    </GameControlsContainer>
  );
};

export default HostGameCustomisationControls;
