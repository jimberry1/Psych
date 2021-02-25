import styled from 'styled-components';
import { keyframes } from 'styled-components';

const ButtonPop = keyframes`
0% {
    transform: scale(1.1);
} 50% {
    transform: scale(1.2);
    background: #4278f5;
} 
100%{ transform: scale(1.1)}`;

export const GeneralBlueButtonStyles = styled.button`
background: #4293f5;
color: white;
border: radius: 10px;
padding: 10px 30px;
outline: none;
font-family: 'Reggae One', cursive;
font-weight: bold;
transition: 0.2s;


&:hover {
    animation: ${ButtonPop} 1s;
    transform: scale(1.1);

}
`;

export const ContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-top;
  margin-top: 30px;
  align-items: center;
  text-align: center;
  overflow-x: none;
  gap: 20px;
  //   overflow: none;
  margin-bottom: 30px;
`;

export const GeneralPageSubTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0px;
  font-family: 'Secular One', sans-serif;
  font-size: 30px;

  @media (max-width: 1000px) {
  }
`;

export const GeneralPageTextBody = styled.span`
  padding: 5px;
  font-family: 'Secular One', sans-serif;
`;

export const GeneralFlexboxColumnDirection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
