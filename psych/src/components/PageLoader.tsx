import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import {
  GeneralFlexboxColumnDirection,
  GeneralPageSubTitle,
} from '../styles/GeneralStyles';
import SubtlePrism from '../assets/images/SubtlePrism.svg';
export interface PageLoaderProps {}

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background: url(${SubtlePrism});
  left: 0;
  content: '';
  opacity: 1;
  display: flex;
  justify-content: center;
`;

const PageLoader: React.SFC<PageLoaderProps> = () => {
  return (
    <Backdrop>
      <GeneralFlexboxColumnDirection
        style={{ position: 'relative', top: '20%', gap: 50 }}
      >
        <GeneralPageSubTitle style={{ color: 'black' }}>
          Just a minute...
        </GeneralPageSubTitle>
        <div>
          <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
        </div>
      </GeneralFlexboxColumnDirection>
    </Backdrop>
  );
};

export default PageLoader;
