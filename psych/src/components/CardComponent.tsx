import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StartButton } from '../UI/ButtonStyle1';
import { GameCodeInputBar } from '../styles/LandingPageStyles';
export interface CardComponentProps {
  icon: any;
  cardTitle: string;
  cardHeight?: number;
  inputPresent: boolean;
  inputValueChanged: (value: any) => void;
  inputValue?: any;
  inputPlaceholder?: string;
  buttonText: string;
  buttonClickedHandler: () => void;
}

const StyledGameCard = styled.div`
  height: 400px;
  width: 300px;
  border: 3px solid white;
  border-radius: 10px;
  //   background: purple;
  background: #222;
`;

const StyledCardSection = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin
`;

const StyledCardTitleSection = styled.span`
  width: 90%;
  padding: 5;
  border-bottom: 1px solid gray;
  font-family: 'Secular One', sans-serif;
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
`;

const StyledCardBodySection = styled.div``;
const CardComponent: React.SFC<CardComponentProps> = ({
  icon,
  cardHeight,
  cardTitle,
  inputValue,
  inputValueChanged,
  inputPresent,
  inputPlaceholder,
  buttonClickedHandler,
  buttonText,
}) => {
  return (
    <StyledGameCard style={{ height: cardHeight ? cardHeight : '' }}>
      <StyledCardSection>
        <FontAwesomeIcon icon={icon} size="7x" />
      </StyledCardSection>
      <StyledCardSection style={{ justifyContent: 'space-around' }}>
        <StyledCardTitleSection>{cardTitle}</StyledCardTitleSection>
        {inputPresent && (
          <GameCodeInputBar
            value={inputValue}
            onChange={(e) => inputValueChanged(e)}
            placeholder={inputPlaceholder}
          />
        )}
        <StartButton
          style={{ margin: 10, height: 75 }}
          onClick={buttonClickedHandler}
        >
          {buttonText}
        </StartButton>
      </StyledCardSection>
    </StyledGameCard>
  );
};

export default CardComponent;
