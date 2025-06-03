import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import RedButton from '../Buttons/redButton';
import GrayButton from '../Buttons/grayButton';
import Stack from '@mui/material/Stack';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

type DeletetDialogProps = {
  open: boolean;
  onClose: () => void;
  name: string;
  onConfirm: () => void;
};

export default function DeleteDialog({
  open,
  onClose,
  name,
  onConfirm,
}: DeletetDialogProps) {
  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      keepMounted
      onClose={onClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{`Do you want delete ${name}?`}</DialogTitle>
      <DialogActions>
        <Stack direction='row' spacing={2} sx={{ mb: 2 }}>
          <GrayButton text='Cancel' size='small' onClick={onClose} />
          <RedButton
            text='Delete'
            size='small'
            onClick={() => {
              onConfirm();
              onClose();
            }}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
