import { withStyles } from '@mui/styles';

const styles = (theme: any) => ({
  card_content: {
    backgroundColor: '#042e41',
    color: '#fff',
  },
  factHeader: {
    fontStyle: 'italic',
    fontSize: 14,
  },
  factValue: {
    fontSize: 14,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
  intRow: {
    color: 'red !important',
  },
});

const stylesComponents = (component: any) => withStyles(styles)(component);
export default stylesComponents;
