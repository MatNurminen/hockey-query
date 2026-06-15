import { LinkProps as MuiLinkProps } from "@mui/material/Link";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

interface LinkRouteProps extends Omit<MuiLinkProps, "component"> {
  to: string;
  children: React.ReactNode;
}

const LinkRoute = ({
  to,
  children,
  underline = "hover",
  className,
  sx,
  ...props
}: LinkRouteProps) => {
  return (
    <Link
      component={RouterLink}
      to={to}
      underline={underline}
      className={className}
      sx={sx}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkRoute;
