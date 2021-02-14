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
    const randomNumber = Math.floor(Math.random() * totalNumberOfQs) + 1;
    if (questionArray.indexOf(randomNumber) === -1)
      questionArray.push(randomNumber);
  }
  return questionArray;
};
