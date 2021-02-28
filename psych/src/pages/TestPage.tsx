import { useState } from 'react';
import styled from 'styled-components';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Modal from '../UI/Modal/Modal';
import ReactFrappeChart from 'react-frappe-charts';
import ProfilePictureUpload from '../ProfilePictureUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { GameCodeInputBar } from '../styles/LandingPageStyles';
import { StartButton } from '../UI/ButtonStyle1';
import CardComponent from '../components/CardComponent';
// export interface TestPageProps {}

const StyledContainer = styled.div`
  margin-top: 300px;
  width: 100vw;
  height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: purple;
`;

const StyledGameCard = styled.div`
  height: 400px;
  width: 300px;
  border: 3px solid black;
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
  // margin: auto;
  height: 20%;
  padding: 5;
  border-bottom: 1px solid gray;
  font-family: 'Secular One', sans-serif;
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
`;

const StyledCardBodySection = styled.div``;

const TestPage = ({ user }: any) => {
  const [toggled, setToggled] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const colors = ['#ff0055', '#0099ff', '#22cc88', '#ffaa00'];
  const [selected, setSelected] = useState('#ff0055');

  const test1 = 'What does XXX do for ch';
  const test2 = 'xxx';

  const testDataForPlayer = [
    { roundNumber: 0, score: 0 },
    { roundNumber: 1, score: 1 },

    // { roundNumber: 1, score: 0 },
    // { roundNumber: 2, score: 2 },
    // { roundNumber: 3, score: 3 },
    // { roundNumber: 4, score: 0 },
    // { roundNumber: 5, score: 4 },
    // { roundNumber: 6, score: 1 },
    // { roundNumber: 7, score: 1 },
    // { roundNumber: 8, score: 2 },
  ];

  console.log(test1.search('XXX'));
  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        duration={120}
        trailColor="transparent"
        colors={[
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ]}
      >
        {({ remainingTime }) => {
          return <div style={{ fontSize: 25 }}>{remainingTime}</div>;
        }}
      </CountdownCircleTimer>
      <div style={{ width: 250 }}>
        <ReactFrappeChart
          title="Score"
          type="line"
          colors={['#21ba45']}
          axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1 }}
          height={250}
          data={{
            labels: testDataForPlayer.map(
              (data) => `round ${data.roundNumber.toString()}`
            ),
            datasets: [
              {
                name: 'points',
                values: testDataForPlayer.map((data) => data.score),
              },
            ],
          }}
        />
      </div>
      {/* <SideDraw
        toggled={toggled}
        setToggled={() => setToggled((curVal) => !curVal)}
      /> */}
      <Modal
        toggled={toggled}
        setToggled={() => setToggled((curVal) => !curVal)}
        message="Modal message"
        title="Test title"
      />
      <div>
        <button onClick={() => setToggled((curVal) => !curVal)}>
          Toggle sidedraw
        </button>
        {test2.replace('xxx', 'jim').replace('XXX', 'jim')}
      </div>

      <ProfilePictureUpload userUid={user.uid} />
      <StyledContainer>
        <StyledGameCard>
          <StyledCardSection
          // style={{ background: 'gray', margin: 10 }}
          >
            <FontAwesomeIcon icon={faUserPlus} size="7x" />
          </StyledCardSection>
          <StyledCardSection>
            <StyledCardTitleSection>New Game</StyledCardTitleSection>
            <GameCodeInputBar
              // value={props.gameCode}
              // onChange={(e) => props.gameCodeChanged(e.target.value)}
              placeholder="Enter Game code..."
            />
            <StartButton style={{ margin: 10 }}>Connect</StartButton>
          </StyledCardSection>
        </StyledGameCard>
        <CardComponent
          cardTitle="New Game"
          buttonText="Connect"
          buttonClickedHandler={() => {}}
          inputPlaceholder="Enter game code..."
          inputValue=""
          inputValueChanged={() => {}}
          icon={faUserPlus}
          inputPresent={true}
        />
      </StyledContainer>
    </div>
  );
};

export default TestPage;
