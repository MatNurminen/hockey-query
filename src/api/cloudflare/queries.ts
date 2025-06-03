import { createQuery } from '../factories/queryFactory';
import { TCfSubfolderDto } from './types';

export const getCfSubfolders = (parentFolder: string) => {
  return createQuery<TCfSubfolderDto[]>(
    ['cfSubfolders', parentFolder],
    `/api/upload-cf/folders/${parentFolder}`
  );
};
