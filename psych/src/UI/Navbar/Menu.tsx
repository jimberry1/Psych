import styled from 'styled-components';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { motion, useAnimation } from 'framer-motion';

export interface MenuProps {
  logout: any;
  setToggle: any;
  toggled: boolean;
  isAuthenticated: boolean;
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

  @media (max-width: 1000px) {
    gap: 30px;
  }
`;

const MenuItem = styled(motion.span)`
  color: white;
  font-size: 30px;
  text-align: center;
  font-family: 'Titan One', cursive;
  cursor: pointer;
  margin-bottom: 10px;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;

const MenuItemVariants = {
  hover: {
    color: '#D309E1',
    scale: 1.2,
  },
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: { y: 0, opacity: 1, transition: { delay: 0.5 } },
};

type player = { linkName: string; linkTo: string; color: string };

const Menu: React.SFC<MenuProps> = ({
  logout,
  setToggle,
  toggled,
  isAuthenticated,
}) => {
  const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];
  const linkArray: player[] = [
    {
      linkName: 'Home',
      linkTo: '/',
      color: '#FF008C',
    },
    { linkName: 'Account', linkTo: '/', color: '#D309E1' },
    {
      linkName: 'Submit Questions',
      linkTo: '/submitQuestion',
      color: '#9C1AFF',
    },
    { linkName: 'Privacy Policy', linkTo: '/', color: '#7700FF' },
  ];
  const animationControl = useAnimation();
  const [redirectTo, setRedirectTo] = useState('');

  const logoutHandler = () => {
    localStorage.removeItem('psy_uid');
    setToggle();
    logout();
  };

  if (toggled) {
    animationControl.start('visible');
    console.log('Anomiation control called');
  } else {
    animationControl.start('hidden');
  }

  const RedirectHandler = (redirectToLocation: string) => {
    setRedirectTo(redirectToLocation);
    setToggle();
  };

  if (!isAuthenticated) {
    return (
      <MenuContainer>
        <MenuItem>Log in to access menu</MenuItem>
      </MenuContainer>
    );
  }
  return (
    <MenuContainer>
      {redirectTo && <Redirect push to={redirectTo} />}
      {linkArray.map((linkObj, index: number) => {
        return (
          <MenuItem
            key={linkObj.color}
            onClick={() => RedirectHandler(linkObj.linkTo)}
            variants={{
              hover: {
                color: linkObj.color,
                scale: 1.2,
              },
              hidden: {
                y: 100,
                opacity: 0,
                color: linkObj.color,
              },
              visible: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.4 + 0.1 * index },
                color: '#FFFFFF',
              },
            }}
            animate={animationControl}
            whileHover="hover"
            whileTap="hover"
          >
            {linkObj.linkName}
          </MenuItem>
        );
      })}
      <MenuItem
        onClick={logoutHandler}
        variants={{
          hover: {
            color: '#4400FF',
            scale: 1.2,
          },
          hidden: {
            y: 100,
            opacity: 0,
          },
          visible: { y: 0, opacity: 1, transition: { delay: 0.8 } },
        }}
        whileHover="hover"
        whileTap="hover"
        animate={animationControl}
      >
        Logout
      </MenuItem>
    </MenuContainer>
  );
};

export default Menu;
