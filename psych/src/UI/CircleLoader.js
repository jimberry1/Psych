import Loader from 'react-loader-spinner';

const CircleLoader = () => {
  return (
    <Loader
      type="Watch"
      color="#00BFFF"
      height={50}
      width={50}
      style={{ padding: '5px' }}
    />
  );
};

export default CircleLoader;
