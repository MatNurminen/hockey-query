import { createQuery } from '../factories/queryFactory';

export const getCfSubfolders = (parentFolder: string) => {
  return createQuery<string[]>(
    ['cfSubfolders', parentFolder],
    `/api/upload-cf/folders/${parentFolder}`
  );
};
