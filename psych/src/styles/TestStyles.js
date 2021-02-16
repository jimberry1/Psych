import styled from 'styled-components';

export const SideDrawer = styled.div`
  height: 100vh;
  width: 33vw;
  position: relative;
  x: ${({ toggled }) => (toggled ? '0' : '-50vw')};
  background: black;
`;
