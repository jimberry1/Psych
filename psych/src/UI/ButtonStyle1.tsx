import styled from 'styled-components';

export const StartButton = styled.button`
  height: 100px;
  width: 60%;
  background-color: #4caf50;
  color: white;
  border-radius: 10px;
  transition: 0.3s linear;
  outline: none;
  margin: auto;

  font-family: Roboto;
  font-size: 2em;
  &:hover {
    background-color: #34b7eb;
    color: #aeeb34;
    transform: translateY(-5px);
  }
`;
