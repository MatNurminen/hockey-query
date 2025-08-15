interface MainLogoProps {
  src: string;
  alt: string;
}

const MainLogo = ({ src, alt }: MainLogoProps) => {
  return <img height={80} alt={alt} src={src} />;
};

export default MainLogo;
