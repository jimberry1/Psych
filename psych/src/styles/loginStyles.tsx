import styled from 'styled-components';
import { keyframes } from 'styled-components';

const ButtonPop = keyframes`
0% {
  transform: scale(1);
} 
50% {
  transform: scale(1.2);

} 100% {
  transform: scale(1.1);
}
`;

export const LoginContainer = styled.div`
  width: 60%;
  background-color: rgba(0, 0, 0, 0.6);
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  overflow: none;
  transform: translateY(100px);

  @media (max-width: 1000px) {
    transform: translateY(40px);
  }
`;

export const LoginPageContainer = styled.div`
  height: 110vh;
  width: 100vw;
  // background: url(https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjR8fHdhbGxwYXBlcnxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=800&q=60)
  background: url(https://images.unsplash.com/photo-1455577380025-4321f1e1dca7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cml2ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)
    no-repeat center center fixed;
  width: 100%;
  background-size: cover;
  overflow: none;
`;

export const InputBar = styled.input`
min-height: 150px
width: 90%;
min-width: 200px;
padding: 10px;
border: 1px solid black;
outline: none;
placeholder: ${(props) => props.placeholder};
font-size: 16px;

@media (min-width: 1000px) {
    width: 40%;
}
`;

export const LoginTitle = styled.h1`
  text-align: center;
  font-family: 'Secular One', sans-serif;
`;

export const InfoGrouping = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  font-family: 'Secular One', sans-serif;

  @media (max-width: 1000px) {
    padding: 10px;
  }
`;

export const SubmitButton = styled.button`
  padding: 15px;
  border-radius: 15px;
  transition: 0.3s linear;
  background-color: green;
  color: green;
  font-family: 'Secular One', sans-serif;
  color: white;
  width: 25%;
  outline: none;

  &:hover {
    background-color: green;
    animation: ${ButtonPop} 0.5s;
    transform: scale(1.1);
  }

  @media (max-width: 1000px) {
    width: 80%;
  }
`;

export const SwitchControls = styled.button`
  padding: 15px;
  transition: 0.3s linear;
  width: 25%;
  outline: none;
  background-color: blue;
  font-family: 'Secular One', sans-serif;
  &:hover {
    background-color: blue;
    animation: ${ButtonPop} 0.5s;
    transform: scale(1.1);
  }

  @media (max-width: 1000px) {
    width: 80%;
  }
`;
