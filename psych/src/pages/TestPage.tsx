import { useState, useEffect } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import styled from 'styled-components';
import { SideDrawer } from '../styles/TestStyles';
import SideDraw from '../UI/Navbar/Sidedraw';
import HamburgerMenu from 'react-hamburger-menu';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Modal from '../UI/Modal/Modal';
import ReactFrappeChart from 'react-frappe-charts';
// export interface TestPageProps {}

const TestPage = () => {
  const [toggled, setToggled] = useState(false);
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
      />
      <div>
        <button onClick={() => setToggled((curVal) => !curVal)}>
          Toggle sidedraw
        </button>
        {test2.replace('xxx', 'jim').replace('XXX', 'jim')}
      </div>
    </div>
  );
};

export default TestPage;
