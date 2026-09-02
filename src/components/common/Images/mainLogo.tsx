import Box from "@mui/material/Box";

const noImage = import.meta.env.VITE_CG_NO_IMAGE;

interface MainLogoProps {
  src?: string;
  alt: string;
}

const MainLogo = ({ src, alt }: MainLogoProps) => {
  return (
    <Box
      component="img"
      alt={alt}
      src={src || noImage}
      sx={{ width: { xs: 60, md: 80 }, height: "auto" }}
    />
  );
};

export default MainLogo;
