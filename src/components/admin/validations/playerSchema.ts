import { number, object, string } from 'yup';

const currentYear = new Date().getFullYear();

const playerSchema = object({
  first_name: string()
    .required('First name is required')
    .max(40, 'More then 40 characters'),
  last_name: string()
    .required('Last name is required')
    .max(40, 'More then 40 characters'),
  jersey_number: number().required('Jersey number is required'),
  player_position: string()
    .required('Player position is required')
    .max(3, 'More then 3 characters'),
  player_order: number().required('Player order is required'),
  nation_id: number().required('Nation is required'),
  birth_year: number().required('Birth year is required'),
  height: number().notRequired(),
  weight: number().notRequired(),
  draft_team_id: number().notRequired(),
  start_year: number()
    .required('Start Year is required')
    .min(1900, `The start year can't be less than 1900`)
    .max(currentYear, `The start year can't be greater than + ${currentYear}`),
  end_year: number()
    .nullable()
    .notRequired()
    .min(1900, `The end year can't be less than 1900`)
    .max(currentYear, `The end year can't be greater than + ${currentYear}`),
});

export default playerSchema;
