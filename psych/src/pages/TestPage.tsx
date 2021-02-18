import { useState, useEffect } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import styled from 'styled-components';
import { SideDrawer } from '../styles/TestStyles';
import SideDraw from '../UI/Navbar/Sidedraw';
import HamburgerMenu from 'react-hamburger-menu';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// export interface TestPageProps {}

const TestPage = () => {
  const [toggled, setToggled] = useState(false);
  const colors = ['#ff0055', '#0099ff', '#22cc88', '#ffaa00'];
  const [selected, setSelected] = useState('#ff0055');

  const test1 = 'What does XXX do for ch';
  const test2 = 'xxx';

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
      <div>
        {/* <HamburgerMenu
          isOpen={toggled}
          menuClicked={() => {
            setToggled((curVal) => !curVal);
          }}
          color="white"
          strokeWidth={3}
        /> */}
      </div>
      {/* <SideDraw
        toggled={toggled}
        setToggled={() => setToggled((curVal) => !curVal)}
      /> */}
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
