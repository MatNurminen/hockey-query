import { createMutation } from '../factories/mutationFactory';
import { MoveFileParams, UploadFileParams } from './types';

export const useUploadFile = () => {
  return createMutation<{ url: string; public_id: string }, UploadFileParams>(
    '/api/upload',
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

export const useDeleteTmpFolder = () => {
  return createMutation<{ success: boolean; message: string }, void>(
    '/api/upload/tmp',
    'DELETE'
  );
};

export const useMoveFile = () => {
  return createMutation<{ url: string; public_id: string }, MoveFileParams>(
    '/api/upload/move',
    'POST',
    {}
  );
};
