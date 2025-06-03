import { createQuery } from '../factories/queryFactory';
import { TLeagueTypeDto } from './types';

export const getLeagueTypes = () => {
  return createQuery<TLeagueTypeDto[]>(['leagueTypes'], `/api/league-types`);
};
