import styled from 'styled-components';
import { useState } from 'react';
import TestPage from '../../pages/TestPage';
import { Redirect } from 'react-router';
import { motion } from 'framer-motion';
export interface MenuProps {
  logout: any;
  setToggle: any;
}

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
`;

const MenuItem = styled(motion.span)`
  color: white;
  font-size: 30px;
  text-align: center;
  font-family: 'Titan One', cursive;
  cursor: pointer;

  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;

const Menu: React.SFC<MenuProps> = ({ logout, setToggle }) => {
  const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];
  const [redirectTo, setRedirectTo] = useState('');

  const logoutHandler = () => {
    localStorage.removeItem('psy_uid');
    setToggle();
    logout();
  };

  const RedirectHandler = (redirectToLocation: string) => {
    setRedirectTo(redirectToLocation);
    setToggle();
  };
  return (
    <MenuContainer>
      {redirectTo && <Redirect push to={redirectTo} />}
      <MenuItem
        onClick={() =>
          //   setToggle();
          RedirectHandler('/')
        }
        variants={{
          hover: {
            color: '#FF008C',
            scale: 1.2,
          },
        }}
        whileHover="hover"
        whileTap="hover"
      >
        Home
      </MenuItem>
      <MenuItem
        onClick={() => RedirectHandler('/')}
        variants={{
          hover: {
            color: '#D309E1',
            scale: 1.2,
          },
        }}
        whileHover="hover"
        whileTap="hover"
      >
        Account
      </MenuItem>
      <MenuItem
        onClick={() => RedirectHandler('/submitQuestion')}
        variants={{
          hover: {
            color: '#9C1AFF',
            scale: 1.2,
          },
        }}
        whileTap="hover"
        whileHover="hover"
      >
        Submit Questions
      </MenuItem>
      <MenuItem
        onClick={() => RedirectHandler('/')}
        variants={{
          hover: {
            color: '#7700FF',
            scale: 1.2,
          },
        }}
        whileHover="hover"
        whileTap="hover"
      >
        Privacy Policy
      </MenuItem>
      <MenuItem
        onClick={logoutHandler}
        variants={{
          hover: {
            color: '#4400FF',
            scale: 1.2,
          },
        }}
        whileHover="hover"
        whileTap="hover"
      >
        Logout
      </MenuItem>
    </MenuContainer>
  );
};

export default Menu;
