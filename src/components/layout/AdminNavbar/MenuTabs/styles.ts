import { withStyles } from '@mui/styles';

const styles = (theme: any) => ({
  dv: {
    background: '#04415a',
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  indicator: {
    backgroundColor: '#fff',
    height: '3px',
  },
  tab: {
    fontWeight: 700,
    fontSize: '13.5px',
    '&:hover': {
      color: '#fff',
    },
  },
  tabLabel: {
    fontWeight: 600,
    letterSpacing: 6,
  },
  paper: {
    marginTop: -20,
    background: 'transparent !Important',
  },
  menuItem: {
    color: '#fff !Important',
    // '&:hover': {
    //   backgroundColor: '#f2f2f0',
    // },
    // '&:focus': {
    //   backgroundColor: '#f2f2f0',
    //   '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //     color: theme.palette.common.black,
    //   },
    // },
  },
});

const stylesComponents = (component: any) => withStyles(styles)(component);
export default stylesComponents;
