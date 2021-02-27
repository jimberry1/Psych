export interface WaveSVGProps {}

const WaveSVG: React.SFC<WaveSVGProps> = () => {
  return (
    <svg viewBox="0 0 1792 279" style={{ marginTop: -5 }}>
      <path
        fill="#1e2d61"
        d="M 0 0 C 245.39999999999998 0 163.60000000000002 66 409 66 L 409 66 L 409 0 L 0 0 Z"
        strokeWidth="0"
      ></path>
      <path
        fill="#1e2d61"
        d="M 408 66 C 728.4 66 621.6 203 942 203 L 942 203 L 942 0 L 408 0 Z"
        strokeWidth="0"
      ></path>
      <path
        fill="#1e2d61"
        d="M 941 203 C 1193 203 1109 81 1361 81 L 1361 81 L 1361 0 L 941 0 Z"
        strokeWidth="0"
      ></path>
      <path
        fill="#1e2d61"
        d="M 1360 81 C 1619.2 81 1532.8 0 1792 0 L 1792 0 L 1792 0 L 1360 0 Z"
        strokeWidth="0"
      ></path>
    </svg>
  );
};

export default WaveSVG;
