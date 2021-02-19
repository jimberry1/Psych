export type voteType = {
  id: number;
  data: {
    voterUid: string;
    voterName: string;
    votedForUid: string;
    votedForName: string;
    roundNumber: number;
    timestamp: any;
  };
};

export type answerType = {
  id: number;
  data: {
    answer: string;
    name: string;
    uid: string;
    roundNumber: number;
    timestamp: any;
  };
};

export type playerType = {
  id: number;
  data: {
    name: string;
    uid: string;
  };
};
