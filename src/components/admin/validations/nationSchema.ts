import { object, string } from 'yup';

const nationSchema = object({
  name: string()
    .required('Name is required')
    .max(50, 'More then 50 characters'),
  short_name: string()
    .required('Short name is required')
    .length(3, 'Short name must be 3 characters'),
  flag: string()
    .required('Flag is required')
    .max(400, 'More then 400 characters'),
  logo: string().notRequired().max(400, 'More then 400 characters'),
  color: string().notRequired().max(7, 'More then 7 characters'),
});

export default nationSchema;
