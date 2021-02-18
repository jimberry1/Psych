import { useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  background: gray;
  left: ${({ toggled }) => (toggled ? '0' : '-200vw')};
  content: '';
  opacity: 0.8;
  display: flex;
  justify-content: center;
`;

const ModalBox = styled.div`
  height: 40vh;
  width: 60vw;
  position: absolute;
  left: 20vw;
  top: 10vh;
  border-radius: 20px;

  border: 3px solid black;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  background-color: #101975;
`;

const InnerModalHeaderContainer = styled.div`
  display: flex;
  width: 80%;
  border-bottom: 1px solid gray;
  text-align: center;
  justify-content: center;
  padding: 5px;
  font-size: 25px;
  font-weight: bold;
  font-family: 'Titan One', cursive;
`;

const ModalMessageContainer = styled.div``;

const ModalButton = styled.button`
  background: #148ea3;
  color: white;
  padding: 10px 25px;
  border-radius: 10%;
  outline: none;
  font-size: 20px;
  transition: 0.2s;

  &:hover {
    background: #0b5966;
    transform: scale(1.2);
  }

  &:selected {
    transform: scale(1.1);
  }
`;

const Modal = ({ toggled, setToggled, message }) => {
  const animationControl = useAnimation();

  useEffect(() => {
    if (toggled) {
      animationControl.start('visible');
    } else {
      animationControl.start('hidden');
    }
  }, [toggled]);
  return (
    <div>
      <Backdrop toggled={toggled} onClick={setToggled} />
      <AnimatePresence>
        {toggled && (
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                //   y: -100,
                x: '-100vw',
              },
              visible: {
                opacity: 1,
                y: 0,
                x: 0,
              },
            }}
            // animate={animationControl}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ModalBox>
              <InnerModalHeaderContainer>Attention</InnerModalHeaderContainer>
              <h3>{message}</h3>
              <ModalButton onClick={setToggled}>Got it</ModalButton>
            </ModalBox>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
