import { number, object } from 'yup';

const tournamentSchema = object({
  season_id: number().required('Season_id of tournament is required'),
  league_id: number().required('Season_id of tournament is required'),
});

export default tournamentSchema;
