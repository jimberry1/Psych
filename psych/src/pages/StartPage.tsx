import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import undraw_To_do_re_jaef from '../assets/images/undraw_To_do_re_jaef.svg';
import undraw_winners_ao2o from '../assets/images/undraw_winners_ao2o.svg';
import SubtlePrism from '../assets/images/SubtlePrism.svg';
import askquestion from '../assets/images/askquestion.svg';
import { GeneralBlueButtonStyles } from '../styles/GeneralStyles';
import { Redirect } from 'react-router';
import PageLoader from '../components/PageLoader';
import WaveSVG from '../UI/WaveSVG';
import GradientText from '../UI/GradientText';

export interface StartPageProps {}

const StartPageContainer = styled.div`
  width: 100vw;
  background: url(${SubtlePrism});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  overflow-x: none;
`;

const GenericContainer = styled.div`
  padding: 25px;
  text-align: center;
  font-size: 45px;
  font-family: 'Secular One', sans-serif;
  color: black;
  max-width: 75%;
  margin-bottom: 50px;
`;

const RowContainer = styled(motion.li)`
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #222;
  border: 5px solid black;
  margin-bottom: 50px;
  border-radius: 30px;
  margin: auto;
  margin-bottom: 50px;

  @media (max-width: 1000px) {
    font-size: 25px;
    flex-direction: column;
    word-wrap: break-word;
  }
`;

const RowSegment = styled.div`
  width: 90%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
  padding: 5px 25px;

  @media (max-width: 1000px) {
    padding: 5px;
  }
`;

const SignInButtonStyling = styled.div`
  padding: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 45px;
  font-family: 'Secular One', sans-serif;
  background: linear-gradient(90deg, #ff8008 0%, #ffc837 100%);
  border: 5px solid #222;
  border-radius: 50px;
  margin: auto;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
    background: linear-gradient(90deg, #ff8008 0%, #c17b16 100%);
  }
`;

const cardVariants = {
  hidden: {
    y: '-50vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, dampening: 5 },
  },
  hover: { y: -10 },
};

const StartPage: React.SFC<StartPageProps> = () => {
  const [redirect, setRedirect] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('psy_uid') !== null) {
      setRedirect(true);
    } else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return (
      <div>
        {redirect && <Redirect push to="/signin" />}
        <PageLoader />
      </div>
    );
  }

  return (
    <StartPageContainer>
      {redirect && <Redirect push to="/signin" />}

      <WaveSVG />
      <GenericContainer>
        Pysch is an interactive quiz game designed to be played with friends
      </GenericContainer>
      <GenericContainer>
        <SignInButtonStyling
          style={{ height: 100, width: 200 }}
          onClick={() => setRedirect(true)}
        >
          Sign in
        </SignInButtonStyling>
      </GenericContainer>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: -200 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.7 } },
        }}
      >
        <RowContainer
          variants={cardVariants}
          whileHover="hover"
          whileTap="hover"
          key="0000011"
        >
          <RowSegment>
            <img
              src={undraw_To_do_re_jaef}
              style={{ height: 400, width: 300 }}
            />
          </RowSegment>

          <RowSegment>
            <GradientText colorGradient="linear-gradient(90deg, #FF8008 0%, #FFC837 100%)">
              Submit answers and vote on your favourites
            </GradientText>
          </RowSegment>
        </RowContainer>

        <RowContainer
          variants={cardVariants}
          whileHover="hover"
          whileTap="hover"
          key="0000012"
        >
          <RowSegment>
            <GradientText colorGradient="linear-gradient(90deg, rgba(63,177,173,1) 0%, rgba(22,42,124,1) 100%)">
              Keep track of scores on our leaderboard
            </GradientText>
          </RowSegment>
          <RowSegment>
            <img
              src={undraw_winners_ao2o}
              style={{ height: 400, width: 300 }}
            />
          </RowSegment>
        </RowContainer>
        <RowContainer
          variants={cardVariants}
          whileHover="hover"
          whileTap="hover"
          key="00000133"
        >
          <RowSegment>
            <img src={askquestion} style={{ height: 400, width: 300 }} />
          </RowSegment>
          <RowSegment>
            <GradientText colorGradient="linear-gradient(to right,#86d480,#6aee3d)">
              Create your own questions for a personal twist
            </GradientText>
          </RowSegment>
        </RowContainer>
      </motion.ul>
    </StartPageContainer>
  );
};

export default StartPage;
