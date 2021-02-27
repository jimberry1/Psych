export interface GradientTextProps {
  colorGradient: string;
  fontSize?: number;
  //   text: string;
}

const GradientText: React.SFC<GradientTextProps> = ({
  colorGradient,
  fontSize = 45,
  //   text,
  children,
}) => {
  return (
    <h1
      style={{
        background: `${colorGradient}`,
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        fontSize: `${fontSize}px`,
        fontFamily: "'Secular One', sans-serif",
      }}
    >
      {children}
    </h1>
  );
};

export default GradientText;
