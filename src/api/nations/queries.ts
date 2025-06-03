import { createQuery } from '../factories/queryFactory';
import { TNationDto } from './types';

export const getNations = () => {
  return createQuery<TNationDto[]>(['nations'], '/api/nations');
};

export const getNation = (id: number) => {
  return createQuery<TNationDto>(['nation', id], `/api/nations/${id}`);
};
