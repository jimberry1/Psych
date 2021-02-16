import VotingOnAnswersComponent from './VotingOnAnswersComponent';
import { createAnOrderedListOfPlayerScores } from '../utilities/utilityFunctions';
import styled from 'styled-components';

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
}

const ResultsTableOrchestrator: React.SFC<ResultsTableOrchestratorProps> = ({
  players,
  votes,
  roundNumber,
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
        </DataRowContainer>
        {createAnOrderedListOfPlayerScores(players, votes, roundNumber).map(
          (player: any, index: number) => {
            return (
              //   <div
              //     key={player.key}
              //     style={{
              //       padding: '10px 50px',
              //       height: 100,
              //       backgroundColor: '#32a852',
              //       textAlign: 'center',
              //       display: 'flex',
              //       justifyContent: 'center',
              //       gap: 25,
              //       alignItems: 'center',
              //       width: '50%',
              //       //   margin: '10px auto',
              //     }}
              //   >
              <DataRowContainer
                key={player.key}
                style={{
                  backgroundColor: index % 2 == 0 ? '#0c2a4a' : '#230e4a',
                }}
              >
                <DataCellContainer>{player.name}</DataCellContainer>
                <DataCellContainer>{player.totalScore}</DataCellContainer>
                <DataCellContainer>+ {player.scoreThisRound}</DataCellContainer>
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
