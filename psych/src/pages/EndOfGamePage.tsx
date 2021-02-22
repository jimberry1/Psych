export interface EndOfGamePageProps {
  user: any;
  gameCode: number;
}

const EndOfGamePage: React.SFC<EndOfGamePageProps> = ({ user, gameCode }) => {
  return <div>Welcome to the end of game page</div>;
};

export default EndOfGamePage;
