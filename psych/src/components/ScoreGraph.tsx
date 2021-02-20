import { voteType } from '../types';
import ReactFrappeChart from 'react-frappe-charts';

export interface ScoreGraphProps {
  playerUid: string;
  votesArray: voteType[];
  roundNumber: number;
}

const ScoreGraph: React.SFC<ScoreGraphProps> = ({
  playerUid,
  votesArray,
  roundNumber,
}) => {
  // Counts the number of votes a player got each round between the start of the game and the current round number
  function generatePlottableDataUsingRoundNumber(
    playerUid: string,
    votesArray: voteType[],
    roundNumber: number
  ) {
    const results = [{ roundNumber: 0, score: 0 }];
    let cumulativeScore = 0;
    for (let i = 1; i <= roundNumber; i++) {
      const numberOfVotesInRound = votesArray
        .filter((vote: voteType) => vote.data.roundNumber === i)
        .filter((vote: voteType) => vote.data.votedForUid === playerUid).length;

      cumulativeScore = cumulativeScore + numberOfVotesInRound;

      results.push({ roundNumber: i, score: cumulativeScore });
    }
    return results;
  }

  const plottableData = generatePlottableDataUsingRoundNumber(
    playerUid,
    votesArray,
    roundNumber
  );

  return (
    <div>
      <ReactFrappeChart
        title="Score"
        type="line"
        colors={['#21ba45']}
        axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1 }}
        height={250}
        data={{
          labels: plottableData.map(
            (data) => `round ${data.roundNumber.toString()}`
          ),

          datasets: [
            {
              name: 'points',
              values: plottableData.map((data) => data.score),
            },
          ],
        }}
      />
    </div>
  );
};

export default ScoreGraph;
