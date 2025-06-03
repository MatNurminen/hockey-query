import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';

const StyledTabs = styled(Tabs)`
  && .MuiTab-root {
    color: #ffffff;
    background-color: #9db1bb;
    text-transform: uppercase;
    margin-right: 6px;
    &:hover {
      background-color: #093f56;
      opacity: 1;
    }
  }
  && .MuiTab-root.Mui-selected {
    color: #ffffff;
    background-color: #093f56;
  }
  && .MuiTabs-indicator {
    display: none; /* Убираем индикатор */
  }
  && .MuiTab-root:last-of-type {
    margin-right: 0;
  }
`;

export default StyledTabs;
