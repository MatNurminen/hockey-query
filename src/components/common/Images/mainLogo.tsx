const noImage = import.meta.env.VITE_CG_NO_IMAGE;

interface MainLogoProps {
  src?: string;
  alt: string;
}

const MainLogo = ({ src, alt }: MainLogoProps) => {
  return <img height={80} alt={alt} src={src || noImage} />;
};

export default MainLogo;
