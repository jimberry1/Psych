import { createAnOrderedListOfPlayerScores } from '../utilities/utilityFunctions';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const RoundResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  //   gap: 15px;
  width: 100%;
  min-width: 300px;
  align-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

const DataRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: none;
  padding: 20px;
  width: 80%;
  font-size: 1.2em;
  align-items: center;

  @media (max-width: 600px) {
    width: 90%;
    font-size: 1em;
    padding: 10px;
  }
`;

const DataCellContainer = styled.div`
  flex: 1;
  text-align: center;

  min-width: 100px;
`;

export interface ResultsTableOrchestratorProps {
  players: any;
  votes: any;
  roundNumber: number;
  playerSelected: any;
  selectedPlayerUid: string;
}

const ResultsTableOrchestrator: React.SFC<ResultsTableOrchestratorProps> = ({
  players,
  votes,
  roundNumber,
  playerSelected,
  selectedPlayerUid,
}) => {
  return (
    <div>
      <RoundResultsContainer>
        <DataRowContainer>
          <DataCellContainer>
            <h2>Name</h2>
          </DataCellContainer>
          <DataCellContainer>
            <h2>Score</h2>
          </DataCellContainer>
          <DataCellContainer>
            <h2>Change</h2>
          </DataCellContainer>
          <div
            style={{
              padding: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon icon={faChartLine} />
          </div>
        </DataRowContainer>
        {createAnOrderedListOfPlayerScores(players, votes, roundNumber).map(
          (player: any, index: number) => {
            return (
              <DataRowContainer
                key={player.key}
                style={{
                  backgroundColor: index % 2 == 0 ? '#0c2a4a' : '#230e4a',
                }}
                onClick={() => {
                  if (selectedPlayerUid === player.uid) {
                    playerSelected('');
                  } else {
                    playerSelected(player.uid);
                  }
                }}
              >
                <DataCellContainer>{player.name}</DataCellContainer>
                <DataCellContainer>{player.totalScore}</DataCellContainer>
                <DataCellContainer>+ {player.scoreThisRound}</DataCellContainer>
                <div
                  style={{
                    borderRadius: '50%',
                    height: 10,
                    width: 10,
                    backgroundColor:
                      selectedPlayerUid === player.uid ? '#23e000' : 'white',
                  }}
                />
              </DataRowContainer>
              //   </div>
            );
          }
        )}
      </RoundResultsContainer>
    </div>
  );
};

export default ResultsTableOrchestrator;
