import {
  GeneralBlueButtonStyles,
  ContainerStyles,
  GeneralPageSubTitle,
} from '..//styles/GeneralStyles';
import Lobby from './Lobby/Lobby';
import { createArrayOfPeopleWhoHaveAnswered } from '../utilities/utilityFunctions';
export interface WaitingForAnswersProps {
  ProceedToVotingHandler: () => void;
  answersArray: any[];
  playersArray: any[];
  roundNumber: number;
  isHost: boolean;
}

const WaitingForAnswers: React.SFC<WaitingForAnswersProps> = ({
  ProceedToVotingHandler,
  answersArray,
  playersArray,
  roundNumber,
  isHost,
}) => {
  return (
    <ContainerStyles>
      <GeneralPageSubTitle style={{ marginBottom: 50 }}>
        Waiting for all players to answer
      </GeneralPageSubTitle>

      <Lobby
        players={createArrayOfPeopleWhoHaveAnswered(
          playersArray,
          answersArray,
          roundNumber
        )}
        showLoader={true}
      />
      {isHost && (
        <GeneralBlueButtonStyles
          onClick={ProceedToVotingHandler}
          style={{ marginTop: 15 }}
        >
          Proceed to Voting round
        </GeneralBlueButtonStyles>
      )}
    </ContainerStyles>
  );
};

export default WaitingForAnswers;
