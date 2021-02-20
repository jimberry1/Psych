import { answerType, voteType } from '../types';
import ReactFrappeChart from 'react-frappe-charts';

export interface ScoreGraphProps {
  playerUid: string;
  votesArray: voteType[];
  answersArray: answerType[];
}

const ScoreGraph: React.SFC<ScoreGraphProps> = ({
  playerUid,
  votesArray,
  answersArray,
}) => {
  function generatePlottableDataForPlayer(
    playerUid: string,
    votesArray: voteType[],
    answersArray: answerType[]
  ) {
    const filteredAndOrderedAns = answersArray
      .filter((ans: answerType) => ans.data.uid === playerUid)
      .sort((ans1, ans2) => {
        if (ans1.data.roundNumber < ans2.data.roundNumber) {
          return -1;
        } else if (ans1.data.roundNumber < ans2.data.roundNumber) {
          return 1;
        } else return 0;
      });

    console.log(filteredAndOrderedAns);

    return [
      { roundNumber: 0, score: 0 },
      ...filteredAndOrderedAns.map((ans: answerType) => {
        const numberOfVotes = votesArray
          .filter(
            (vote: voteType) => vote.data.roundNumber === ans.data.roundNumber
          )
          .filter((vote: voteType) => vote.data.votedForUid === ans.data.uid)
          .length;

        return {
          roundNumber: ans.data.roundNumber,
          score: numberOfVotes,
        };
      }),
    ];
  }

  const plottableData = generatePlottableDataForPlayer(
    playerUid,
    votesArray,
    answersArray
  );

  console.log(plottableData);

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
