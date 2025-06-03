import { withStyles } from '@mui/styles';

const styles = (theme: any) => ({
  tblRow: {
    //backgroundColor: '#fff',
    '&:nth-of-type(odd)': {
      backgroundColor: '#ecf1f3',
    },
  },
});

const stylesComponents = (component: any) => withStyles(styles)(component);
export default stylesComponents;
