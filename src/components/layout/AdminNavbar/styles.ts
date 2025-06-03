import { withStyles } from '@mui/styles';

const styles = (theme: any) => ({
  appbar: {
    marginBottom: '2em',
    elevation: 0,
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1em',
    },
  },
  toolbar: {
    paddingTop: '10px',
    paddingBottom: '10px',
    backgroundColor: '#063950',
  },
  tabs: {
    margin: 'auto',
    //color: '#fff',
  },
  dv: {
    background: '#9aabb3',
  },
  logo: {
    width: '100px',
  },
  tabContainer: {
    margin: 'auto',
  },
  tab: {
    marginLeft: 20,
    padding: 0,
  },

  drawer: {
    backgroundColor: '#063950',
  },
  drawerIconContainer: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    color: '#fff',
  },
  drawerIcon: {
    height: '30px',
    width: '30px',
  },
  indicator: {
    backgroundColor: '#fff',
    height: '3px',
  },
  listClass: {
    '&:hover': {
      color: '#000',
    },
  },
});

const stylesComponents = (component: any) => withStyles(styles)(component);
export default stylesComponents;
