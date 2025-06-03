import { array, number, object, string } from 'yup';

const currentYear = new Date().getFullYear();

const teamSchema = object({
  full_name: string()
    .required('Full name is required')
    .max(250, 'More then 250 characters'),
  name: string()
    .required('Name is required')
    .max(50, 'More then 50 characters'),
  short_name: string()
    .required('Short name is required')
    .max(10, 'More then 10 characters'),
  start_year: number()
    .required('Start year is required')
    .min(1900, `The start year can't be less than 1900`)
    .max(currentYear, `The start year can't be greater than + ${currentYear}`),
  end_year: number()
    .nullable()
    .notRequired()
    .min(1900, `The end year can't be less than 1900`)
    .max(currentYear, `The end year can't be greater than + ${currentYear}`),
  nation_id: number().required('Nation of team is required'),
  logos: array()
    .of(
      object().shape({
        logo: string().required('Logo is required'),
        start_year: number()
          .required('Start Year is required')
          .min(1900, `The start year can't be less than 1900`)
          .max(
            currentYear,
            `The start year can't be greater than + ${currentYear}`
          ),
        end_year: number()
          .nullable()
          .notRequired()
          .min(1900, `The end year can't be less than 1900`)
          .max(
            currentYear,
            `The end year can't be greater than + ${currentYear}`
          ),
      })
    )
    .required('At least one logo is required'),
});

export default teamSchema;
