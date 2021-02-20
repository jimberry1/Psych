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
  function generatePlottableDataUsingRoundNumber(
    playerUid: string,
    votesArray: voteType[],
    roundNumber: number
  ) {
    console.log('inside method with roundNumber' + roundNumber);
    const results = [{ roundNumber: 0, score: 0 }];
    // How about instead of doing it like this we pass the round number, then do a for loop, counting the number of votes for each round
    for (let i = 1; i <= roundNumber; i++) {
      console.log('inside for loop and filtering data');
      const numberOfVotesInRound = votesArray
        .filter((vote: voteType) => vote.data.roundNumber === i)
        .filter((vote: voteType) => vote.data.votedForUid === playerUid).length;

      console.log(numberOfVotesInRound);
      results.push({ roundNumber: i, score: numberOfVotesInRound });
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
