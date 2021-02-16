import { useState, useEffect } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import styled from 'styled-components';
import { SideDrawer } from '../styles/TestStyles';
import SideDraw from '../UI/Navbar/Sidedraw';
import HamburgerMenu from 'react-hamburger-menu';
// export interface TestPageProps {}

const TestPage = () => {
  const [toggled, setToggled] = useState(false);
  const colors = ['#ff0055', '#0099ff', '#22cc88', '#ffaa00'];
  const [selected, setSelected] = useState('#ff0055');

  return (
    <div>
      Hello!
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
      </div>
    </div>
  );
};

export default TestPage;
