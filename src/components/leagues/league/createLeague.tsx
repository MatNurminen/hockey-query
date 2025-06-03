import { useReducer } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SectionHeader from '../../common/Sections/sectionHeader';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import { useMutation } from '@apollo/client';

//import { CREATE_LEAGUE, GET_LEAGUES } from '../../../queries/Leagues';

const CreateLeague = () => {
  const [formInput, setFormInput] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {}
  );

  const handleInput = (e: any) => {
    const name = e.target.name;
    let newValue: any = '';
    if (e.target.name === 'start_year' || e.target.name === 'end_year') {
      newValue = Number(e.target.value);
    } else if (e.target.name === 'is_local') {
      newValue = Boolean(e.target.value);
    } else {
      newValue = e.target.value;
    }
    setFormInput({ [name]: newValue });
  };

  const handleSubmit = (e: any) => {
    // e.preventDefault();
    // const res = createLeague();
  };

  // const [createLeague, { loading, error }] = useMutation(CREATE_LEAGUE, {
  //   variables: formInput,
  //   refetchQueries: [GET_LEAGUES],
  // });

  // if (error) return <p>Error</p>;
  // if (loading) return <p>Loading...</p>;

  return (
    <>
      <SectionHeader txtAlign='left' content='Create League' />
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          required
          name='name'
          label='Name'
          variant='outlined'
          size='small'
          onChange={handleInput}
        />
        <TextField
          required
          name='short_name'
          label='Short Name'
          variant='outlined'
          size='small'
          onChange={handleInput}
        />
        <TextField
          required
          name='start_year'
          label='Start Year'
          variant='outlined'
          size='small'
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={handleInput}
        />
        <TextField
          name='end_year'
          label='End Year'
          variant='outlined'
          size='small'
          onChange={handleInput}
        />
        <TextField
          name='color'
          label='Color'
          variant='outlined'
          size='small'
          onChange={handleInput}
        />
        <FormControlLabel
          control={<Checkbox onChange={handleInput} name='is_local' />}
          label='Is local?'
        />
      </Box>
      <Button onClick={handleSubmit}>Save</Button>
    </>
  );
};

export default CreateLeague;
