import { withStyles } from '@mui/styles';

const styles = (theme: any) => ({
  tblRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  },
  ul: {
    flexdirection: 'column',
    flexwrap: 'wrap',
    display: 'flex',
    height: '100vh',
    columncount: 3,
  },
});

const stylesComponents = (component: any) => withStyles(styles)(component);
export default stylesComponents;
