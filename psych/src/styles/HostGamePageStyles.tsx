import styled from 'styled-components';

export const GameControlsContainer = styled.div`
  display: flex;
  width: 75%;
  margin: auto;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  margin-bottom: 30px;
  font-family: Roboto;
  padding: 20px;
  background-color: #222;
  flex-wrap: wrap;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const GameControlsInnerBox = styled.div`
  flex: 1;
  display: flex;
  min-height: 100%;
  min-width: 50%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const GameControlsOptionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex: 1;
`;

export const GameControlsInnerBoxTitle = styled.h2`
  border-bottom: 1px solid white;
  width: 80%;
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
`;

export const GameControlsInnerBoxContent = styled.div`
  width: 60%;
  padding: 5px;
  text-align: center;
  border-radius: 50%;
  transition 0.5s;
`;
