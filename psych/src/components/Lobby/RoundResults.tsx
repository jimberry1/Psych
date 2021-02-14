import { useState, useEffect } from 'react';
import db from '../../firebase';
import {
  ContainerStyles,
  GeneralBlueButtonStyles,
} from '../../styles/GeneralStyles';

export interface RoundResultsProps {
  gameCode: string | number;
  roundNumber: number;
  user: any;
  numberOfPlayers: number;
  isResultsRound: boolean;
  votesArray: any;
}

const RoundResults: React.SFC<RoundResultsProps> = (props) => {
  //   const [votes, setVotes] = useState([]);

  // Loads the votes for the round with a snapshot listener
  //   useEffect(() => {
  //     console.log('loading votes...');
  //     const votesSnapshot = db
  //       .collection('games')
  //       .doc(props.gameCode.toString())
  //       .collection('votes')
  //       .where('roundNumber', '==', props.roundNumber)
  //       .onSnapshot((snap: any) => {
  //         setVotes(
  //           snap.docs.map((vote: any) => ({ id: vote.id, data: vote.data() }))
  //         );
  //         if (
  //           snap.docs.length > 0 &&
  //           snap.docs.length === props.numberOfPlayers
  //         ) {
  //           console.log(
  //             `Auto progressing to the results round as the system as determined that of the ${props.numberOfPlayers} players in the game, all have voted as there are ${snap.docs.length} votes`
  //           );
  //           db.collection('games')
  //             .doc(props.gameCode.toString())
  //             .set(
  //               { isResultsRound: true, isVotingRound: false },
  //               { merge: true }
  //             );
  //         }
  //       });
  //     return votesSnapshot;
  //   }, [props]);

  //Uses the votes from the snapshot to create a local results table.

  const nextRoundHandler = () => {
    db.collection('games')
      .doc(props.gameCode.toString())
      .set(
        {
          isResultsRound: false,
          isVotingRound: false,
          roundNumber: props.roundNumber + 1,
        },
        { merge: true }
      );
  };

  return (
    <ContainerStyles>
      {props.isResultsRound && (
        <div>
          <h1>Results</h1>
          <p>Total number of results {props.votesArray.length}</p>
          <p>
            Total number of results for me:{' '}
            {
              props.votesArray
                .filter(
                  (vote: any) => vote.data.roundNumber === props.roundNumber
                )
                .filter((vote: any) => vote.data.votedForUid === props.user.uid)
                .length
            }
          </p>
          <GeneralBlueButtonStyles onClick={nextRoundHandler}>
            Proceed to round {props.roundNumber + 1}
          </GeneralBlueButtonStyles>
        </div>
      )}
    </ContainerStyles>
  );
};

export default RoundResults;
