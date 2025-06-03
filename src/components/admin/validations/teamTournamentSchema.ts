import { number, object } from 'yup';

const teamTournamentSchema = object({
  tournament_id: number().required('ID of tournament is required'),
  team_id: number().required('ID of team is required'),
});

export default teamTournamentSchema;
