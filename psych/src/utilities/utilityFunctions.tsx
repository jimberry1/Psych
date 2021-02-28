import { answerType, playerType, voteType } from '../types';

export const makeRandomGameId = (length: number) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Generates an array the length of the number of rounds, with each value of the array being the index of the question that will be asked for the round.
// This index will be used to look up the question in the question database table during the game
export const questionArrayGenerator = (
  numberOfRounds: number,
  totalNumberOfQs: number
) => {
  const questionArray = [];

  while (questionArray.length < numberOfRounds) {
    const randomNumber = Math.floor(Math.random() * totalNumberOfQs);
    if (questionArray.indexOf(randomNumber) === -1)
      questionArray.push(randomNumber);
  }
  return questionArray;
};

// Creates an array containing each player in the game and a boolean indicator of whether they have answered
export const createArrayOfPeopleWhoHaveAnswered = (
  playerArray: playerType[],
  answersArray: answerType[],
  roundNumber: number
) => {
  const namesOfPeopleWhoHaveAnswered = answersArray
    .filter((answer: answerType) => answer.data.roundNumber === roundNumber)
    .map((answer: answerType) => answer.data.uid);

  return playerArray.map((player: any) => ({
    ...player,
    hasAnswered: namesOfPeopleWhoHaveAnswered.includes(player.data.uid),
  }));
};

// Creates an array containing each player in the game and a boolean indicator of whether they have voted
export const createArrayOfPeopleWhoHaveVoted = (
  playerArray: playerType[],
  votedArray: voteType[],
  roundNumber: number
) => {
  const namesOfPeopleWhoHaveAnswered = votedArray
    .filter((vote: voteType) => vote.data.roundNumber === roundNumber)
    .map((vote: voteType) => vote.data.voterName);

  return playerArray.map((player: any) => ({
    ...player,
    hasAnswered: namesOfPeopleWhoHaveAnswered.includes(player.data.name),
  }));
};

// Returns an array of players containing a key, name uid and the player's total score and the score increase during the current round, ordered from highest total score to lowest
export const createAnOrderedListOfPlayerScores = (
  playersArray: any,
  votesArray: any,
  roundNumber: number
) => {
  const playersScores = playersArray.map((player: any) => {
    let totalScore = 0;
    let scoreThisRound = 0;
    for (let i = 0; i < votesArray.length; i++) {
      if (votesArray[i].data.votedForUid === player.data.uid) {
        totalScore++;

        // Sub if statement to see if the score increase occurred this round
        if (votesArray[i].data.roundNumber === roundNumber) {
          scoreThisRound++;
        }
      }
    }
    return {
      key: player.id,
      name: player.data.name,
      uid: player.data.uid,
      totalScore: totalScore,
      scoreThisRound: scoreThisRound,
    };
  });

  // Sorts the scores into descending order
  function scoreComparator(scoreA: any, scoreB: any) {
    if (scoreA.totalScore < scoreB.totalScore) {
      return 1;
    } else if (scoreA.totalScore > scoreB.totalScore) {
      return -1;
    }
    return 0;
  }

  return playersScores.sort(scoreComparator);
};

// Counts the score each player received in a given round
export const countVotesForEachAnswerInArrayForAProvidedRound = (
  answerArray: answerType[],
  votesArray: voteType[],
  roundNumber: number
) => {
  const filteredVotes = votesArray.filter(
    (vote) => vote.data.roundNumber === roundNumber
  );
  return answerArray
    .filter((ans) => ans.data.roundNumber === roundNumber)
    .map((ans) => {
      let numberOfVotes = 0;
      for (let i = 0; i < filteredVotes.length; i++) {
        if (filteredVotes[i].data.votedForUid === ans.data.uid) {
          numberOfVotes++;
        }
      }
      return {
        answer: ans.data.answer,
        name: ans.data.name,
        numberOfVotes: numberOfVotes,
        uid: ans.data.uid,
      };
    });
};

// Creates an array of randomly picked names ranging from index 0 to the number of rounds in the game -1
export const randomlyPickNamesForQuestions = (
  playersArray: playerType[],
  numberOfRounds: number
) => {
  const playerNameArray = [];
  for (let i = 0; i < numberOfRounds; i++) {
    const randomNumber = Math.floor(Math.random() * playersArray.length);
    playerNameArray.push(playersArray[randomNumber].data.name);
  }
  return playerNameArray;
};

// A work in progress of a more efficient way to work out who the player with the highest score is
export const calculatePlayerWithMostVotes = (votesArray: voteType[]) => {
  const playerVotesMap = new Map();

  votesArray.forEach((vote: voteType) => {
    if (playerVotesMap.has(vote.data.votedForUid)) {
      const voteCount = playerVotesMap.get(vote.data.votedForUid);
      playerVotesMap.set(vote.data.votedForUid, voteCount + 1);
    } else {
      playerVotesMap.set(vote.data.votedForUid, 1);
    }
  });

  let playerUid = '';
  let highestNumberOfVotes = 0;
  for (let mapEntry in playerVotesMap) {
  }

  console.log(playerVotesMap);
};
