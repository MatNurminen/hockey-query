import supabase from './supabaseClient';

const deleteFile = async (folderPath: string) => {
  try {
    const { data: folderContents, error: listError } = await supabase.storage
      .from('hockey')
      .list(folderPath);

    if (listError) {
      if (listError.message.includes('not found')) {
        return;
      }
      throw listError;
    }

    if (!folderContents || folderContents.length === 0) {
      return;
    }

    const filePaths = folderContents.map(
      (file) => `${folderPath}/${file.name}`
    );

    const { error: deleteError } = await supabase.storage
      .from('hockey')
      .remove(filePaths);

    if (deleteError) {
      throw deleteError;
    }
  } catch (error) {
    console.error('Error deleting files', error);
    throw error;
  }
};

export default deleteFile;
