import { createQuery } from '../factories/queryFactory';
import { TSeasonDto } from './types';

export const getSeasons = () => {
  return createQuery<TSeasonDto[]>(['seasons'], '/api/seasons');
};
