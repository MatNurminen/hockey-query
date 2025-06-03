import { createMutation } from '../factories/mutationFactory';
import { MoveFileParams, UploadFileParams } from './types';

export const useUploadCfFile = () => {
  return createMutation<{ url: string; key: string }, UploadFileParams>(
    '/api/upload-cf',
    'POST',
    {
      transformBody: (variables) => {
        const formData = new FormData();
        formData.append('file', variables.file);
        if (variables.folder) {
          formData.append('folder', variables.folder);
        }
        return formData;
      },
    }
  );
};

export const useMoveCfFile = () => {
  return createMutation<{ message: string; key: string }, MoveFileParams>(
    '/api/upload-cf/move',
    'POST',
    {}
  );
};

export const useDeleteAllFromTmp = () => {
  return createMutation<{}, void>('/api/upload-cf/tmp', 'DELETE');
};
