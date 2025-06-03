import supabase from './supabaseClient';

const moveFile = async (fromPath: string, toPath: string) => {
  const bucketName = 'hockey';

  const { error: copyError } = await supabase.storage
    .from(bucketName)
    //.copy(fromPath, toPath);
    .upload(fromPath, toPath, {
      upsert: true,
    });

  if (copyError) throw copyError;

  const { error: removeError } = await supabase.storage
    .from(bucketName)
    .remove([fromPath]);

  if (removeError) throw removeError;

  return toPath;
};

export default moveFile;
