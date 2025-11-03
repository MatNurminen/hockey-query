import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import AppButton from '../../common/Buttons/appButton';
import HeaderTable from './headerTable';
import Stack from '@mui/material/Stack';
import { memo, useState } from 'react';
import DeleteDialog from '../../common/Dialogs/deleteDialog';
import TableFlag from '../../common/Images/tableFlag';
import { getNations } from '../../../api/nations/queries';
import { useDeleteNation } from '../../../api/nations/mutations';

const NationsTable = () => {
  const [selectedNation, setSelectedNation] = useState<any | null>(null);
  const [name, setName] = useState('');

  const { data: nations } = getNations();
  const { mutate: deleteNation } = useDeleteNation();

  const currentSeason = 2024;

  const handleOpen = (id: number) => {
    setSelectedNation(id);
  };

  const handleClose = () => {
    setSelectedNation(null);
  };

  const handleDelete = () => {
    if (selectedNation) {
      deleteNation(
        { id: selectedNation },
        {
          onSuccess: () => setSelectedNation(null),
        }
      );
    }
  };

  return (
    <Stack spacing={3}>
      <DeleteDialog
        open={Boolean(selectedNation)}
        onClose={handleClose}
        name={name}
        onConfirm={handleDelete}
      />
      <TableContainer component={Paper}>
        <Table size='small'>
          <HeaderTable />
          <TableBody>
            {nations?.map((nation: any) => (
              <TableRow key={nation.id}>
                <TableCell align='center'>
                  <TableFlag alt={nation.name} src={nation.flag} />
                </TableCell>
                <TableCell>
                  <Link
                    underline='hover'
                    component={RouterLink}
                    to={`/nations/${nation.id}?season=${currentSeason}`}
                  >
                    {nation.name}
                  </Link>
                </TableCell>
                <TableCell>{nation.short_name}</TableCell>
                <TableCell align='right'>
                  <AppButton
                    text='Delete'
                    size='small'
                    color='error'
                    iconName='delete'
                    onClick={() => {
                      handleOpen(nation.id), setName(nation.name);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default memo(NationsTable);
