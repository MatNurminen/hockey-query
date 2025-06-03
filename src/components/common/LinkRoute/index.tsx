import { Link as RouterLink } from 'react-router';
import Link from '@mui/material/Link';

const LinkRoute = (props: any) => (
  <Link underline='hover' {...props} component={RouterLink} />
);

export default LinkRoute;
