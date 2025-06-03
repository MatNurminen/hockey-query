import supabase from './supabaseClient';
import { useSnackbar } from 'notistack';

const createFolder = async (newFolder: string) => {
  const { enqueueSnackbar } = useSnackbar();

  if (!newFolder) {
    return enqueueSnackbar('Input folder name', { variant: 'error' });
  }

  const folderPath = `${newFolder}/empty.txt`;
  const { error } = await supabase.storage
    .from('hockey')
    .upload(folderPath, new Blob(['']));

  if (error) {
    console.error('Error creating a folder', error);
    enqueueSnackbar(`Error creating a folder ${error.message}`, {
      variant: 'error',
    });
  } else {
    enqueueSnackbar(`The folder “${newFolder}” was successfully created`, {
      variant: 'success',
    });
    //setNewFolder('');
    //fetchFolders();
  }
};

export default createFolder;
