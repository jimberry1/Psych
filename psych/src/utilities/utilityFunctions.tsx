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

export const createArrayOfPeopleWhoHaveAnswered = (
  playerArray: any,
  answersOrQuestionsArray: any,
  roundNumber: number
) => {
  const namesOfPeopleWhoHaveAnswered = answersOrQuestionsArray
    .filter((answer: any) => answer.data.roundNumber === roundNumber)
    .map((answer: any) => answer.data.uid);

  return playerArray.map((player: any) => ({
    ...player,
    hasAnswered: namesOfPeopleWhoHaveAnswered.includes(player.data.uid),
  }));
};

export const createArrayOfPeopleWhoHaveVoted = (
  playerArray: any,
  answersOrQuestionsArray: any,
  roundNumber: number
) => {
  const namesOfPeopleWhoHaveAnswered = answersOrQuestionsArray
    .filter((answer: any) => answer.data.roundNumber === roundNumber)
    .map((answer: any) => answer.data.voterName);

  return playerArray.map((player: any) => ({
    ...player,
    hasAnswered: namesOfPeopleWhoHaveAnswered.includes(player.data.name),
  }));
};

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
