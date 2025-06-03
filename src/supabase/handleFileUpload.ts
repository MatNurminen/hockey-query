// Функция для загрузки файла
const handleFileUpload = async (filePath: string) => {
  if (!fileToUpload) {
    // Если fileToUpload == null, не продолжаем загрузку
    enqueueSnackbar('Файл не выбран', { variant: 'error' });
    return;
  }

  const { data, error } = await supabase.storage
    .from('hockey')
    .upload(filePath, fileToUpload, { upsert: true });

  if (error) {
    console.error('Ошибка при загрузке файла:', error);
    enqueueSnackbar('Ошибка загрузки файла', { variant: 'error' });
    return;
  }

  // Путь к загруженному файлу
  const uploadedFilePath = data?.path;

  // Выводим путь в консоль или используем его в дальнейшем
  console.log('Загруженный файл доступен по пути:', uploadedFilePath);

  enqueueSnackbar('Файл загружен!', { variant: 'success' });
  setConfirmDialogOpen(false);
};
