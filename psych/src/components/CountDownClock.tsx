import { CountdownCircleTimer } from 'react-countdown-circle-timer';
export interface CountDownClockProps {
  duration: number;
  countDownComplete: () => void;
}

const CountDownClock: React.SFC<CountDownClockProps> = ({
  duration,
  countDownComplete,
}) => {
  return (
    <CountdownCircleTimer
      isPlaying
      duration={duration}
      trailColor="transparent"
      colors={[
        ['#004777', 0.33],
        ['#F7B801', 0.33],
        ['#A30000', 0.33],
      ]}
      size={100}
      onComplete={countDownComplete}
    >
      {({ remainingTime }) => {
        return <div style={{ fontSize: 25 }}>{remainingTime}</div>;
      }}
    </CountdownCircleTimer>
  );
};

export default CountDownClock;
