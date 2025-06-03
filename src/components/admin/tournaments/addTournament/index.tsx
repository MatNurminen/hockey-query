import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import SelectSeason from '../../../common/Selects/selectSeason';
import SelectLeague from '../../../common/Selects/selectLeague';
import { useAddTournament } from '../../../../api/tournaments/mutations';
import { useFormik } from 'formik';
import tournamentSchema from '../../validations/tournamentSchema';
import { useSnackbar } from 'notistack';
import DialogContent from '@mui/material/DialogContent';
import SectionHeader from '../../../common/Sections/sectionHeader';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid2';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import GreenButton from '../../../common/Buttons/greenButton';
import GrayButton from '../../../common/Buttons/grayButton';

export interface AddTournamentDialogProps {
  open: boolean;
  onClose: () => void;
  leagueId: string;
}

const AddTournament = (props: AddTournamentDialogProps) => {
  const { onClose, open, leagueId } = props;
  const { mutateAsync: addTournament } = useAddTournament(Number(leagueId));
  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      season_id: 2024,
      league_id: Number(leagueId),
    },
    validationSchema: tournamentSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        const result = await addTournament(values);
        if (result.id) {
          enqueueSnackbar(
            `Tournament added successfully with id: ${result.id}`,
            {
              variant: 'success',
            }
          );
          formik.resetForm();
          setSaving(false);
          onClose();
        }
      } catch (e) {
        enqueueSnackbar('Failed to save tournament.', { variant: 'error' });
      } finally {
        setSaving(false);
      }
    },
  });

  const showCancelSnackbar = () => {
    enqueueSnackbar("Tournament didn't add.", { variant: 'error' });
  };

  const handleClose = () => {
    formik.resetForm();
    onClose();
    showCancelSnackbar();
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogContent>
        <SectionHeader txtAlign='left' content='Add Tournament' />
        <Box position='relative'>
          {saving && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Box component='form' noValidate autoComplete='off'>
            <Grid container spacing={2} rowSpacing={3}>
              <Grid size={{ xs: 6 }}>
                <SelectLeague />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Box>
                  <SelectSeason
                    value={formik.values.season_id?.toString()}
                    onChange={(val) =>
                      formik.setFieldValue('season_id', Number(val))
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 5 }}>
        <Stack direction='row' spacing={2}>
          <GreenButton
            text='Save'
            size='small'
            onClick={formik.handleSubmit}
            iconIndex={1}
          />
          <GrayButton
            text='Cancel'
            size='small'
            onClick={() => handleClose()}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AddTournament;
