import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AppButton from '../Buttons/appButton';
import GrayButton from '../Buttons/grayButton';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  onConfirm: () => void;
  loading?: boolean;
};

export default function DeleteDialog({
  open,
  onClose,
  name,
  onConfirm,
  loading = false,
}: DeleteDialogProps) {
  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      keepMounted
      onClose={onClose}
      role='alertdialog'
      aria-labelledby='delete-dialog-title'
      aria-describedby='delete-dialog-description'
      aria-modal='true'
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle id='delete-dialog-title'>
        <Stack direction='row' spacing={1} alignItems='center'>
          <WarningIcon color='warning' />
          <Typography>Do you want to delete '{name}'?</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Typography id='delete-dialog-description'>
          This action can't be undone. '{name}' will be permanently deleted!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Stack direction='row' spacing={2} sx={{ mb: 2 }}>
          <GrayButton
            text='Cancel'
            size='small'
            onClick={onClose}
            disabled={loading}
            autoFocus
          />
          <AppButton
            text={loading ? 'Deleting...' : 'Delete'}
            size='small'
            color='error'
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={loading}
          />
          {loading && <CircularProgress size={20} sx={{ ml: 1 }} />}
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
