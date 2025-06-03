import { useSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SectionHeader from '../../../common/Sections/sectionHeader';
import DialogActions from '@mui/material/DialogActions';
import GreenButton from '../../../common/Buttons/greenButton';
import { useFormik } from 'formik';
import GrayButton from '../../../common/Buttons/grayButton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import { useCallback, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useUpdatePlayer } from '../../../../api/players/mutations';
import playerSchema from '../../validations/playerSchema';
import SelectNumber from '../../../common/Selects/selectNumber';
import SelectNation from '../../../common/Selects/selectNation';
import SelectTeam from '../../../common/Selects/selectTeam';
import { getPlayer } from '../../../../api/players/queries';

export interface UpdatePlayerDialogProps {
  open: boolean;
  onClose: () => void;
  playerId: number;
}

const UpdatePlayer = (props: UpdatePlayerDialogProps) => {
  const { mutateAsync: updatePlayer } = useUpdatePlayer();
  const { onClose, open, playerId } = props;
  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { data: player, isError, isLoading } = getPlayer(playerId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading nation data</div>;
  if (!player) return <div>No data available</div>;

  const formik = useFormik({
    initialValues: {
      first_name: player.first_name,
      last_name: player.last_name,
      jersey_number: player.jersey_number,
      player_position: player.player_position,
      player_order: player.player_order,
      birth_year: player.birth_year,
      height: player?.height || undefined,
      weight: player?.weight || undefined,
      start_year: player.start_year,
      end_year: player?.end_year || undefined,
      nation_id: player.nation_id,
      draft_team_id: player?.draft_team_id || undefined,
    },
    enableReinitialize: true,
    validationSchema: playerSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        await updatePlayer(
          {
            id: playerId,
            first_name: values.first_name,
            last_name: values.last_name,
            jersey_number: values.jersey_number,
            player_position: values.player_position,
            player_order: values.player_order,
            birth_year: values.birth_year,
            height: values.height,
            weight: values.weight,
            start_year: values.start_year,
            end_year: values.end_year,
            nation_id: values.nation_id,
            draft_team_id: values.draft_team_id,
          },
          {
            onSuccess: () => {
              formik.resetForm();
              onClose();
            },
          }
        );
      } catch (e) {
        enqueueSnackbar('Failed to save player.', { variant: 'error' });
      } finally {
        setSaving(false);
      }
    },
  });

  const showCancelSnackbar = () => {
    enqueueSnackbar("Player didn't save.", { variant: 'error' });
  };

  const handleClose = () => {
    formik.resetForm();
    onClose();
    showCancelSnackbar();
  };

  const handleNationChange = useCallback(
    (value: number) => {
      formik.setFieldValue('nation_id', value);
    },
    [formik]
  );

  return (
    <Dialog open={open}>
      <DialogContent>
        <SectionHeader txtAlign='left' content='Add Player' />
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
                <TextField
                  fullWidth
                  required
                  name='first_name'
                  label='First Name'
                  variant='outlined'
                  size='small'
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.first_name &&
                    Boolean(formik.errors.first_name)
                  }
                  helperText={
                    formik.touched.first_name && formik.errors.first_name
                  }
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  required
                  name='last_name'
                  label='Last Name'
                  variant='outlined'
                  size='small'
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.last_name && Boolean(formik.errors.last_name)
                  }
                  helperText={
                    formik.touched.last_name && formik.errors.last_name
                  }
                />
              </Grid>
              <Grid size={{ xs: 3 }}>
                <SelectNumber
                  value={formik.values.jersey_number}
                  label='Jersey Number *'
                  id='jersey_number'
                  name='jersey_number'
                  min={1}
                  max={99}
                  onChange={(value: number) => {
                    formik.setFieldValue('jersey_number', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.jersey_number &&
                    Boolean(formik.errors.jersey_number)
                  }
                  helperText={
                    formik.touched.jersey_number && formik.errors.jersey_number
                  }
                />
              </Grid>
              <Grid size={{ xs: 3 }}>
                <TextField
                  fullWidth
                  required
                  name='player_position'
                  label='Position'
                  variant='outlined'
                  size='small'
                  value={formik.values.player_position}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.player_position &&
                    Boolean(formik.errors.player_position)
                  }
                  helperText={
                    formik.touched.player_position &&
                    formik.errors.player_position
                  }
                />
              </Grid>
              <Grid size={{ xs: 2 }}>
                <SelectNumber
                  value={formik.values.player_order}
                  label='Order'
                  id='player_order'
                  name='player_order'
                  min={1}
                  max={3}
                  onChange={(value: number) => {
                    formik.setFieldValue('player_order', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.player_order &&
                    Boolean(formik.errors.player_order)
                  }
                  helperText={
                    formik.touched.player_order && formik.errors.player_order
                  }
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <SelectNation
                  id='nation_id'
                  name='nation_id'
                  value={formik.values.nation_id}
                  label='Nation *'
                  onChange={handleNationChange}
                  onBlur={formik.handleBlur}
                  errorId={
                    formik.touched.nation_id && Boolean(formik.errors.nation_id)
                  }
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <SelectNumber
                  value={formik.values.birth_year}
                  label='Birth Year *'
                  id='birth_year'
                  name='birth_year'
                  min={1950}
                  max={2020}
                  onChange={(value: number) => {
                    formik.setFieldValue('birth_year', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.birth_year &&
                    Boolean(formik.errors.birth_year)
                  }
                  helperText={
                    formik.touched.birth_year && formik.errors.birth_year
                  }
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <SelectNumber
                  value={formik.values.height}
                  label='Height'
                  id='height'
                  name='height'
                  min={150}
                  max={220}
                  onChange={(value: number) => {
                    formik.setFieldValue('height', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.height && Boolean(formik.errors.height)}
                  helperText={formik.touched.height && formik.errors.height}
                />
              </Grid>
              <Grid size={{ xs: 4 }}>
                <SelectNumber
                  value={formik.values.weight}
                  label='Weight'
                  id='weight'
                  name='weight'
                  min={50}
                  max={120}
                  onChange={(value: number) => {
                    formik.setFieldValue('weight', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.weight && Boolean(formik.errors.weight)}
                  helperText={formik.touched.weight && formik.errors.weight}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <SelectTeam
                  leagueId={14}
                  id='draft_team'
                  name='draft_team'
                  label='Draft Team'
                  value={formik.values.draft_team_id}
                  onChange={(value: number | null) => {
                    formik.setFieldValue('draft_team_id', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.draft_team_id &&
                    Boolean(formik.errors.draft_team_id)
                  }
                  helperText={
                    formik.touched.draft_team_id && formik.errors.draft_team_id
                  }
                />
              </Grid>
              <Grid size={{ xs: 3 }}>
                <SelectNumber
                  value={formik.values.start_year}
                  label='Start Year *'
                  id='start_year'
                  name='start_year'
                  min={1980}
                  max={new Date().getFullYear()}
                  onChange={(value: number) => {
                    formik.setFieldValue('start_year', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.start_year &&
                    Boolean(formik.errors.start_year)
                  }
                  helperText={
                    formik.touched.start_year && formik.errors.start_year
                  }
                />
              </Grid>
              <Grid size={{ xs: 3 }}>
                <SelectNumber
                  value={formik.values.end_year}
                  label='End Year'
                  id='end_year'
                  name='end_year'
                  min={1980}
                  max={new Date().getFullYear()}
                  onChange={(value: number) => {
                    formik.setFieldValue('end_year', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.end_year && Boolean(formik.errors.end_year)
                  }
                  helperText={formik.touched.end_year && formik.errors.end_year}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 2 }}>
        <Stack direction='row' spacing={2}>
          <GreenButton
            text='Save'
            size='small'
            onClick={formik.handleSubmit}
            iconIndex={1}
            disabled={saving}
          />
          <GrayButton
            text='Cancel'
            size='small'
            onClick={handleClose}
            disabled={saving}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePlayer;
